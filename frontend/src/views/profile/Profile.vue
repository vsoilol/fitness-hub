<template>
  <div class="view-profile" content>
    <div max-width>
      <masonry :cols="{ default: 2, 600: 1 }" gutter="20px">
        <div>
          <h4>Тренеровка</h4>
          <tc-list :dark="$store.getters.darkmode">
            <tc-list-item
              title="Тренировки"
              icon="heartbeat"
              routeName="workouts"
            />

            <tc-list-item
              title="План тренировок"
              icon="list"
              routeName="trainingplan"
            />

            <tc-list-item
              title="Статистика тренировок"
              icon="chart-bar"
              routeName="statistics"
            />
            <tc-badge position="inside" :value="achievements" tfcolor="success">
              <tc-list-item
                title="Успехи"
                icon="star"
                routeName="achievements"
              />
            </tc-badge>
          </tc-list>
        </div>

        <div>
          <h4>Управление</h4>
          <tc-list :dark="$store.getters.darkmode">
            <tc-list-item
              title="Рецепты"
              icon="book-cook-filled"
              routeName="recipes"
            />
            <tc-list-item title="Упражнения" icon="gym" routeName="exercises" />
            <tc-list-item
              v-group.admin.moderator
              title="Планы питания"
              icon="calendar-alt"
              routeName="nutritionplans"
            />
            <tc-list-item
              title="Настройки"
              icon="wrench"
              routeName="settings"
            />
          </tc-list>
        </div>

        <div v-group.admin.moderator>
          <h4>Панель администратора</h4>
          <tc-list :dark="$store.getters.darkmode">
            <tc-badge :value="submissions" tfcolor="success" position="inside">
              <tc-list-item
                title="Представленные упражнения"
                icon="reply"
                routeName="exercise-submissions"
              />
            </tc-badge>
            <tc-list-item
              title="Переменные"
              icon="gears"
              routeName="mgmt-variables"
            />
          </tc-list>
        </div>

        <tc-list :dark="$store.getters.darkmode">
          <tc-list-item
            error
            icon="logout"
            title="Выход из системы"
            @click="signout"
          />
        </tc-list>
      </masonry>

      <!-- <div class="footer" @click="copyID">
        <div>User ID</div>
        <div>{{ $store.getters.user._id }}</div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { AchievementManager } from '@/utils/AchievementManager';
import { signOut } from '@/utils/auth';
import { copyToClipboard } from '@/utils/functions';
import { NotificationManagement } from '@/utils/NotificationManagement';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Profile extends Vue {
  public copyID(): void {
    copyToClipboard(this.$store.getters.user._id);
  }

  public signout(): void {
    signOut();
  }

  get unreadMessages(): number {
    return NotificationManagement.getUnreadMessages();
  }

  get submissions(): number {
    return NotificationManagement.getExerciseSubmissions();
  }

  get achievements(): number {
    return AchievementManager.getNew();
  }
}
</script>

<style lang="scss" scoped>
.view-profile {
  padding-top: 0;
  h4 {
    margin-bottom: 4px;
    margin-left: 5px;
    opacity: 0.75;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
  }
  .tc-list {
    margin-bottom: 20px;
    .tc-badge:not(:last-child):after {
      position: absolute;
      content: '';
      z-index: 10;
      bottom: 0;
      right: 0;
      left: 50px;
      height: 1px;
      background: currentColor;
      opacity: 0.2;
    }
  }
  .footer {
    font-size: 12px;
    div {
      text-align: center;
      opacity: 0.5;
    }
  }
}
</style>
