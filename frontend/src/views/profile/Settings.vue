<template>
  <div class="view-settings" content>
    <div max-width>
      <tl-grid gap="0px 20">
        <div>
          <h3>Общие сведения</h3>
          <tc-list :dark="$store.getters.darkmode">
            <tc-list-item
              title="Язык"
              icon="book-filled"
              description="Deutsch"
              value="0"
            />
            <tc-list-item
              title="Зарегистрирован в"
              icon="at"
              :description="$store.getters.user.provider"
              value="0"
            />
            <tc-list-item
              title="Редактировать профиль"
              icon="pencil"
              :href="profileEditUrl"
              value="0"
            />
          </tc-list>
        </div>

        <div>
          <h3>Друзья</h3>
          <tc-list :dark="$store.getters.darkmode">
            <tc-list-item
              title="Полученные заявки"
              icon="add"
              :value="isSettingEnabled('FRIENDS_RECEIVE_INVITES')"
              @input="val => toggleSetting(val, 'FRIENDS_RECEIVE_INVITES')"
            />
            <tc-list-item
              title="Получать новости"
              icon="chat-bubbles"
              :value="isSettingEnabled('FRIENDS_RECEIVE_MESSAGES')"
              @input="val => toggleSetting(val, 'FRIENDS_RECEIVE_MESSAGES')"
            />
            <tc-list-item
              title="Принимать вызовы"
              icon="ghost"
              :value="isSettingEnabled('FRIENDS_RECEIVE_CHALLENGES')"
              @input="val => toggleSetting(val, 'FRIENDS_RECEIVE_CHALLENGES')"
            />
          </tc-list>
          <h4>Поделиться</h4>
          <tc-list :dark="$store.getters.darkmode">
            <tc-list-item
              title="Вес"
              icon="barometer"
              :value="isSettingEnabled('FRIENDS_SHARE_WEIGHT')"
              @input="val => toggleSetting(val, 'FRIENDS_SHARE_WEIGHT')"
            />
            <tc-list-item
              title="Счётчик выпитой воды"
              icon="bucket"
              :value="isSettingEnabled('FRIENDS_SHARE_WATER')"
              @input="val => toggleSetting(val, 'FRIENDS_SHARE_WATER')"
            />
            <tc-list-item
              title="Размер"
              icon="arrows-v"
              :value="isSettingEnabled('FRIENDS_SHARE_HEIGHT')"
              @input="val => toggleSetting(val, 'FRIENDS_SHARE_HEIGHT')"
            />
            <tc-list-item
              title="Последние тренировки"
              icon="gym"
              :value="isSettingEnabled('FRIENDS_SHARE_LATEST_WORKOUTS')"
              @input="
                val => toggleSetting(val, 'FRIENDS_SHARE_LATEST_WORKOUTS')
              "
            />
            <tc-list-item
              title="Статистика тренировок"
              icon="heartbeat"
              :value="isSettingEnabled('FRIENDS_SHARE_STATS')"
              @input="val => toggleSetting(val, 'FRIENDS_SHARE_STATS')"
            />
          </tc-list>
        </div>
      </tl-grid>
    </div>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { Vue, Component } from 'vue-property-decorator';

enum AvailableSetting {
  FRIENDS_RECEIVE_INVITES = 'FRIENDS_RECEIVE_INVITES',
  FRIENDS_RECEIVE_MESSAGES = 'FRIENDS_RECEIVE_MESSAGES',
  FRIENDS_RECEIVE_CHALLENGES = 'FRIENDS_RECEIVE_CHALLENGES',
  FRIENDS_SHARE_WEIGHT = 'FRIENDS_SHARE_WEIGHT',
  FRIENDS_SHARE_WATER = 'FRIENDS_SHARE_WATER',
  FRIENDS_SHARE_HEIGHT = 'FRIENDS_SHARE_HEIGHT',
  FRIENDS_SHARE_STATS = 'FRIENDS_SHARE_STATS',
  FRIENDS_SHARE_LATEST_WORKOUTS = 'FRIENDS_SHARE_LATEST_WORKOUTS'
}

@Component
export default class Settings extends Vue {
  public disabledSettings: AvailableSetting[] = [];

  async mounted() {
    this.disabledSettings = (await backend.get('setting')).data;
  }

  public isSettingEnabled(setting: AvailableSetting): boolean {
    return !this.disabledSettings.includes(setting);
  }

  public async toggleSetting(
    enabled: boolean,
    setting: AvailableSetting
  ): Promise<void> {
    if (enabled) {
      await backend.delete('setting/' + setting);
    } else {
      await backend.put('setting/' + setting);
    }
  }

  get profileEditUrl(): string {
    switch (this.$store.getters.user.provider) {
      case 'amazon':
        return 'https://www.amazon.com/gp/pdp/profile/';
      case 'adobe':
        return 'https://account.adobe.com/profile';
      case 'github':
        return 'https://github.com/settings/profile';
      case 'steam':
        return 'https://steamcommunity.com/my/edit';
      default:
        return 'https://myaccount.google.com/personal-info';
    }
  }
}
</script>

<style lang="scss" scoped>
.view-settings {
  &[content] {
    padding-top: 0;
  }
  .tc-list__dark {
    /deep/ .tc-list-item {
      &:hover {
        background: rgba(lighten($paragraph_dark, 20%), 0.5);
      }
      .tc-switch input:not(:checked) + label .container {
        background: $container_dark !important;
      }
    }
  }
  /deep/ .tc-switch input:checked + label .container {
    background: $success !important;
  }
}
</style>
