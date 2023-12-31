<template>
  <div class="view-suspend-user" content>
    <div max-width>
      <h3>Заблокированные пользователи</h3>

      <tc-spinner
        v-if="!suspensions"
        size="20"
        :dark="$store.getters.darkmode"
      />
      <p v-else-if="suspensions.length === 0">
        Заблокированных пользователей пока нет
      </p>
      <FHList v-else>
        <FHListItem
          v-for="m in suspensions"
          :key="m._id"
          :avatar="m.avatar"
          :title="m.username"
          :subtitle="getSubtitle(m)"
        >
          <tc-button tfbackground="alarm" name="pardon" @click="pardon(m)" />
        </FHListItem>
      </FHList>

      <br />
      <h3>Nutzer sperren</h3>

      <br />
      <tl-flow flow="column" v-if="!user">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
          <path
            d="M25 0a25 25 0 1025 25A25 25 0 0025 0zm0 9.677a8.871 8.871 0 11-8.871 8.871A8.871 8.871 0 0125 9.678zm0 34.677a19.317 19.317 0 01-14.768-6.875 11.239 11.239 0 019.929-6.028 2.467 2.467 0 01.716.111 13.347 13.347 0 004.123.7 13.3 13.3 0 004.123-.7 2.467 2.467 0 01.716-.111 11.239 11.239 0 019.929 6.028A19.317 19.317 0 0125 44.355z"
            fill="#2ed573"
          />
        </svg>
        <br />
        <tc-link tfcolor="success" @click="$oFS('mgmt-user-search')">
          Пользователи выбирают
        </tc-link>
      </tl-flow>

      <div v-else>
        <tl-flow>
          <tc-avatar size="tiny" :src="user.avatar" />
          <b name>{{ user.username }}</b>
        </tl-flow>
        <tc-input
          :dark="$store.getters.darkmode"
          type="date"
          placeholder="Предотвращение входа в систему вплоть до"
          v-model="until"
        />
        <br />
        <tl-flow>
          <tc-button
            @click="$oFS('mgmt-user-search')"
            icon="swap"
            name="Изменить пользователя"
            tfbackground="alarm"
          />
          <tc-button
            @click="suspend"
            icon="blocked"
            name="Блокировка пользователей"
            tfbackground="error"
          />
        </tl-flow>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FHList from '@/components/list/FHList.vue';
import FHListItem from '@/components/list/FHListItem.vue';
import backend from '@/utils/backend';
import { IUserInfo } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

type IBanInfo = IUserInfo & { suspended: number; suspendedBy: string };

@Component({
  components: {
    FHList,
    FHListItem
  }
})
export default class SuspendUser extends Vue {
  public suspensions: IBanInfo[] | null = null;
  public until = '';
  public users: IUserInfo[] = [];

  mounted() {
    this.loadSuspensions();

    const date = new Date();
    const month = ('0' + (((date.getMonth() + 1) % 12) + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    this.until = date.getFullYear() + '-' + month + '-' + day;
  }

  get user(): IUserInfo | null {
    const query = this.$route.query.user;
    if (!query) return null;
    return JSON.parse(decodeURI(query as string)) || null;
  }

  public async loadSuspensions(): Promise<void> {
    this.suspensions = (await backend.get('user/suspended')).data;

    if (this.suspensions) {
      const ids = [...new Set(this.suspensions.map(x => x.suspendedBy))];
      this.users = [];
      ids.forEach(x => {
        backend.get('user/' + x).then(res => this.users.push(res.data));
      });
    }
  }

  public getSubtitle(item: IBanInfo): string | null {
    const username = this.getUserName(item.suspendedBy);
    const date = this.getBanDate(item.suspended);
    let returnString = '';
    if (username) returnString = 'von ' + username + ' ';
    return returnString + 'bis ' + date;
  }

  public getUserName(id: string): string | null {
    const user = this.users.filter(x => x._id === id)[0];
    if (!user) return null;
    return user.username;
  }

  public getBanDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
  }

  public async pardon(user: IUserInfo): Promise<void> {
    await backend.delete('user/suspend/' + user._id);
    this.loadSuspensions();
  }

  public async suspend(): Promise<void> {
    const user = this.user;
    if (!user || !user._id) return;
    const date = new Date(this.until);
    if (date && date.getTime() > new Date().getTime()) {
      await backend.post('user/suspend/' + user._id + '/' + date.getTime());
      this.loadSuspensions();
      this.$router.replace({ name: this.$route.name || '' });
    }
  }
}
</script>

<style lang="scss" scoped>
.view-suspend-user {
  padding-top: 0;

  b[name] {
    margin: 0 20px;
  }

  .tc-input {
    max-width: 270px;
    margin: 10px auto 0;
  }

  .fh-list-item {
    .tc-button {
      border-radius: 50px;
      margin-right: -5px;
    }
  }
}
</style>
