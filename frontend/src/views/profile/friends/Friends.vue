<template>
  <div class="view-friends" content>
    <div max-width>
      <FHAppear>
        <div v-if="friendRequests && friendRequests.length > 0">
          <h3>Запросы</h3>
          <FHList>
            <FHListItem
              v-for="r in friendRequests"
              :key="r._id"
              :avatar="
                r.invitee._id !== $store.getters.user._id
                  ? r.invitee.avatar
                  : r.target.avatar
              "
              :title="
                r.invitee._id !== $store.getters.user._id
                  ? r.invitee.username
                  : r.target.username
              "
            >
              <tc-action :dark="$store.getters.darkmode">
                <template v-if="r.invitee._id === $store.getters.user._id">
                  <tc-action-item
                    error
                    title="Отмена"
                    icon="trashcan-alt"
                    @click="cancelInvite(r._id)"
                  />
                </template>
                <template v-else>
                  <tc-action-item
                    error
                    title="Снижение"
                    icon="blocked"
                    @click="cancelInvite(r._id)"
                  />
                  <tc-action-item
                    success
                    title="Принять"
                    icon="user-plus-filled"
                    @click="acceptInvite(r._id)"
                  />
                </template>
              </tc-action>
            </FHListItem>
          </FHList>
        </div>
      </FHAppear>

      <tl-flow horizontal="space-between">
        <h3>Друзья</h3>
        <tc-link @click="$oFS('add-friend')" tfcolor="success">
          Добавить друга
        </tc-link>
      </tl-flow>
      <tc-spinner
        v-if="!friends"
        :dark="$store.getters.darkmode"
        size="20"
        variant="dots-spin"
      />
      <FHList v-else-if="friends.length > 0">
        <FHListItem
          v-for="f in friends"
          :key="f._id"
          :avatar="f.avatar"
          :title="f.username"
          @click="showProfile(f._id)"
        >
          <tc-action :dark="$store.getters.darkmode">
            <!-- <tc-action-item
              icon="trophy"
              title="Herausfordern"
              @click="challengeFriend(f._id)"
            />
            <tc-action-item
              icon="calendar-alt"
              title="Training planen"
              @click="planTraining(f._id)"
            /> -->
            <tc-action-item
              icon="user-filled"
              title="Просмотр профиля"
              @click="showProfile(f._id)"
            />
            <tc-action-item
              icon="chat-bubbles"
              title="Отправить сообщение"
              @click="openChat(f._id)"
            />
            <tc-action-item
              error
              icon="trashcan-alt"
              title="Удалить друга"
              @click="removeFriend(f._id)"
            />
          </tc-action>
        </FHListItem>
      </FHList>
      <p v-else>
        До сих пор вы тренировались только для себя. Добавляйте друзей, чтобы
        поделиться своими достижениями и начать общение.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import FHAppear from '@/components/FHAppear.vue';
import FHList from '@/components/list/FHList.vue';
import FHListItem from '@/components/list/FHListItem.vue';
import { fhBotId } from '@/utils/constants';
import { openFullscreen } from '@/utils/functions';
import { IPendingFriendship, IUserInfo } from '@/utils/interfaces';
import { UserManagement } from '@/utils/UserManagement';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    FHList,
    FHListItem,
    FHAppear
  }
})
export default class Friends extends Vue {
  get friends(): IUserInfo[] | null {
    let friends = UserManagement.getFriends();
    if (!friends) return null;
    friends = friends.filter(x => x._id !== fhBotId);
    if (friends.length === 0) return null;
    return friends;
  }

  get friendRequests(): IPendingFriendship[] | null {
    return this.$store.getters.friendRequests;
  }

  public acceptInvite(pendingId: string): void {
    UserManagement.acceptInvite(pendingId);
  }

  public cancelInvite(pendingId: string): void {
    UserManagement.cancelInvite(pendingId);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public challengeFriend(friendId: string): void {
    // TODO:
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public planTraining(friendId: string): void {
    // TODO:
  }

  public showProfile(friendId: string): void {
    openFullscreen('friend-details', { id: friendId });
  }

  public openChat(friendId: string): void {
    openFullscreen('chatroom', { friendId: friendId }, undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public removeFriend(friendId: string): void {
    UserManagement.removeFriend(friendId);
  }
}
</script>

<style lang="scss" scoped>
.view-friends {
  padding-top: 0;
}
</style>
