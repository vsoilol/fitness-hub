<template>
  <tc-tabbar :moveout="$route.meta.fullscreen" :dark="$store.getters.darkmode">
    <tc-tabbar-item
      tfcolor="success"
      icon="house"
      title="Главная"
      routeName="home"
    />
    <tc-badge :value="$store.getters.unreadPosts" tfcolor="success">
      <tc-tabbar-item
        tfcolor="success"
        icon="star"
        title="Новости"
        routeName="community"
      />
    </tc-badge>
    <tc-badge
      v-if="$store.getters.valid"
      :value="profileNotifications"
      tfcolor="success"
    >
      <tc-tabbar-item
        tfcolor="success"
        icon="user-filled"
        title="Профиль"
        routeName="profile"
      />
    </tc-badge>
    <tc-tabbar-item
      v-else
      tfcolor="success"
      icon="login"
      title="Логин"
      @click="$oFS('login')"
    />
    <tc-tabbar-item
      tfcolor="success"
      icon="gym"
      title="Спорт"
      routeName="training"
    />
    <tc-tabbar-item
      tfcolor="success"
      icon="apple-alt"
      title="Питание"
      routeName="nutrition"
    />
  </tc-tabbar>
</template>

<script lang="ts">
import { NotificationManagement } from '@/utils/NotificationManagement';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class FHTabbar extends Vue {
  get profileNotifications(): number {
    return NotificationManagement.getTotalNotifications();
  }
}
</script>

<style lang="scss" scoped>
.tc-tabbar {
  @media #{$isDesktop} {
    display: none !important;
  }
  transition: all 0.5s ease-in-out !important;
  &[moveout] {
    transform: translateY(calc(50px + env(safe-area-inset-bottom)));
    opacity: 0;
  }
  .tc-badge {
    flex: 1 1 0px;
    margin: 0 2.5px;
  }
}
</style>
