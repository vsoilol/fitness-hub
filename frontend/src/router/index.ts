import store from '@/store';
import Login from '@/views/login/Login.vue';
import Nutritionplan from '@/views/nutrition/Nutritionplan.vue';
import Recipe from '@/views/nutrition/Recipe.vue';
import Scanner from '@/views/nutrition/Scanner.vue';
import SearchRecipe from '@/views/nutrition/SearchRecipe.vue';
import WikiItem from '@/views/nutrition/WikiItem.vue';
import ChatRoom from '@/views/profile/ChatRoom.vue';
import UpdateExercise from '@/views/profile/exercise/UpdateExercise.vue';
import AddFriend from '@/views/profile/friends/AddFriend.vue';
import FriendDetails from '@/views/profile/friends/Details.vue';
import ExerciseSubmission from '@/views/profile/management/ExerciseSubmission.vue';
import UserSearch from '@/views/profile/management/UserSearch.vue';
import NutritionplanRecipeSearch from '@/views/profile/nutritionplans/NutritionplanRecipeSearch.vue';
import UpdateRecipe from '@/views/profile/recipe/UpdateRecipe.vue';
import UpdateTrainingplan from '@/views/profile/trainingplan/UpdateTrainingplan.vue';
import AddToWorkout from '@/views/profile/workout/AddToWorkout.vue';
import CreateWorkout from '@/views/profile/workout/CreateWorkout.vue';
import RunningWorkout from '@/views/profile/workout/RunningWorkout.vue';
import UpdateWorkout from '@/views/profile/workout/UpdateWorkout.vue';
import Exercise from '@/views/training/Exercise.vue';
import SearchExercise from '@/views/training/SearchExercise.vue';
import Workout from '@/views/training/Workout.vue';
import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { Position, PositionResult } from 'vue-router/types/router';

Vue.use(VueRouter);
const prefix = 'FitnessHub | ';

const getPos = (to: Route): Position | null => {
  const stored = store.state.savedPositions[to.fullPath];
  if (stored) return stored;
  return null;
};

const router = new VueRouter({
  async scrollBehavior(to): Promise<PositionResult> {
    if (to.hash) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ offset: { x: 0, y: 80 }, selector: to.hash });
        }, 500);
      });
    }

    const pos = getPos(to);
    if (pos) {
      return { ...pos, behavior: 'auto' };
    }
    return { x: 0, y: 0 };
  },
  mode: 'history',

  routes: [
    /**
     * => Start short urls
     */

    {
      path: '/r/:id',
      redirect: to => {
        return { name: 'recipe-details', params: { id: to.params.id } };
      }
    },
    {
      path: '/e/:id',
      redirect: to => {
        return { name: 'exercise-details', params: { id: to.params.id } };
      }
    },
    {
      path: '/p/:id',
      redirect: to => {
        return { name: 'nutritionplan', params: { id: to.params.id } };
      }
    },
    {
      path: '/w/:id',
      redirect: to => {
        return { name: 'workout-details', params: { id: to.params.id } };
      }
    },

    /**
     * <= End short urls
     */

    /**
     * => Start Fullscreen
     */

    {
      path: '/add-to-workout',
      name: 'add-to-workout',
      component: AddToWorkout,
      meta: {
        title: prefix + 'Добавить упражнение',
        fullscreen: true,
        needsSignIn: true,
        fsFallback: 'training'
      }
    },
    {
      path: '/active-workout',
      name: 'run-workout',
      component: RunningWorkout,
      meta: {
        title: prefix + 'Тренировка',
        fullscreen: true,
        needsSignIn: true,
        fsFallback: 'workouts'
      }
    },
    {
      path: '/training/search',
      name: 'search-exercise',
      component: SearchExercise,
      meta: {
        title: prefix + 'Поиск',
        fullscreen: true,
        fsFallback: 'training'
      }
    },
    {
      path: '/nutrition/search',
      name: 'search-recipe',
      component: SearchRecipe,
      meta: {
        title: prefix + 'Поиск',
        fullscreen: true,
        fsFallback: 'nutrition'
      }
    },
    {
      path: '/training/exercise/:id',
      name: 'exercise-details',
      component: Exercise,
      meta: {
        title: prefix + 'Упражнение',
        fullscreen: true,
        fsFallback: 'training'
      }
    },
    {
      path: '/training/workout/:id',
      name: 'workout-details',
      component: Workout,
      meta: {
        title: prefix + 'Тренировка',
        fullscreen: true,
        fsFallback: 'training'
      }
    },
    {
      path: '/training/workout/:id/update',
      name: 'update-workout',
      component: UpdateWorkout,
      meta: {
        title: prefix + 'Редактировать тренировку',
        fullscreen: true,
        needsSignIn: true,
        fsFallback: 'workouts'
      }
    },
    {
      path: '/nutrition/scanner',
      name: 'food-scanner',
      component: Scanner,
      meta: {
        title: prefix + 'Сканер фруктов/овощей',
        fullscreen: true,
        fsFallback: 'nutrition'
      }
    },
    {
      path: '/nutrition/recipe/:id',
      name: 'recipe-details',
      component: Recipe,
      meta: {
        title: prefix + 'Рецепт',
        fullscreen: true,
        fsFallback: 'nutrition'
      }
    },
    {
      path: '/nutrition/recipe/:id/update',
      name: 'update-recipe',
      component: UpdateRecipe,
      meta: {
        title: prefix + 'Изменить рецепт',
        needsSignIn: true,
        fullscreen: true
      }
    },
    {
      path: '/nutrition/plan/:id',
      name: 'nutritionplan',
      component: Nutritionplan,
      meta: {
        title: prefix + 'План питания',
        fullscreen: true
      }
    },
    {
      path: '/nutrition/wiki/:id',
      name: 'nutrition-wiki-item',
      component: WikiItem,
      meta: {
        title: prefix + 'Вики по питанию',
        fullscreen: true
      }
    },
    {
      path: '/training/exercise/:id/update',
      name: 'update-exercise',
      component: UpdateExercise,
      meta: {
        title: prefix + 'Редактировать упражнение',
        needsSignIn: true,
        fullscreen: true,
        fsFallback: 'exercises'
      }
    },
    {
      path: '/profile/messages/:friendId',
      name: 'chatroom',
      component: ChatRoom,
      meta: {
        title: prefix + 'ChatRoom',
        needsSignIn: true,
        fullscreen: true,
        fsFallback: 'messages'
      }
    },
    {
      path: '/profile/friends/add',
      name: 'add-friend',
      component: AddFriend,
      meta: {
        title: prefix + 'Добавить друга',
        needsSignIn: true,
        fullscreen: true,
        fsFallback: 'friends'
      }
    },
    {
      path: '/profile/friends/:id',
      name: 'friend-details',
      component: FriendDetails,
      meta: {
        title: prefix + 'Друг',
        needsSignIn: true,
        fullscreen: true,
        fsFallback: 'friends'
      }
    },
    {
      path: '/profile/workouts/create',
      name: 'create-workout',
      component: CreateWorkout,
      meta: {
        title: prefix + 'Создать тренировку',
        needsSignIn: true,
        fullscreen: true,
        fsFallback: 'workouts'
      }
    },
    {
      path: '/profile/trainingplan/update/:day',
      name: 'update-trainingplan',
      component: UpdateTrainingplan,
      meta: {
        title: prefix + 'Изменить план тренировок',
        needsSignIn: true,
        fullscreen: true,
        fsFallback: 'trainingplan'
      }
    },

    {
      path: '/profile/nutritionplans/recipe-search/:day/:daytime',
      name: 'np-recipe-search',
      component: NutritionplanRecipeSearch,
      meta: {
        title: prefix + 'Выберите рецепт',
        needsSignIn: true,
        groups: ['Admin', 'Moderator'],
        fullscreen: true,
        fsFallback: 'nutritionplans'
      }
    },

    {
      path: '/profile/management/submissions/:id',
      name: 'exercise-submission',
      component: ExerciseSubmission,
      meta: {
        title: prefix + 'Представленные упражнения',
        needsSignIn: true,
        groups: ['Admin', 'Moderator'],
        fullscreen: true,
        fsFallback: 'exercise-submissions'
      }
    },

    {
      path: '/profile/management/user-search',
      name: 'mgmt-user-search',
      component: UserSearch,
      meta: {
        title: prefix + 'Найти пользователей',
        needsSignIn: true,
        groups: ['Admin', 'Moderator'],
        fullscreen: true,
        fsFallback: 'profile'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: prefix + 'Login',
        fullscreen: true,
        fsFallback: 'home'
      }
    },
    /**
     * <= Ende Fullscreen
     */
    {
      path: '/community',
      component: () => import('@/views-interim/Community-Interim.vue'),
      children: [
        {
          path: '',
          name: 'community',
          component: () => import('@/views/community/Community.vue'),
          meta: {
            title: prefix + 'Новости',
            hero: 'Новости'
          }
        },
        {
          path: 'create',
          name: 'create-post',
          component: () => import('@/views/community/CreatePost.vue'),
          meta: {
            title: prefix + 'Добавить новость',
            hero: 'Добавить новость',
            needsSignIn: true,
            groups: ['Admin', 'Moderator']
          }
        },
        {
          path: 'edit/:id',
          name: 'edit-post',
          component: () => import('@/views/community/EditPost.vue'),
          meta: {
            title: prefix + 'Редактировать почту',
            hero: 'Редактировать почту',
            needsSignIn: true,
            groups: ['Admin', 'Moderator']
          }
        },
        { path: '*', redirect: { name: 'community' } }
      ]
    },
    {
      path: '/profile',
      component: () => import('@/views-interim/Profile-Interim.vue'),
      children: [
        {
          path: '',
          name: 'profile',
          component: () => import('@/views/profile/Profile.vue'),
          meta: {
            title: prefix + 'Профиль',
            needsSignIn: true,
            hero: 'Профиль'
          }
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/profile/Settings.vue'),
          meta: {
            title: prefix + 'Настройки',
            needsSignIn: true,
            hero: 'Настройки'
          }
        },
        {
          path: 'messages',
          name: 'messages',
          component: () => import('@/views/profile/Messages.vue'),
          meta: {
            title: prefix + 'Новости',
            needsSignIn: true,
            hero: 'Новости'
          }
        },
        {
          path: 'friends',
          name: 'friends',
          component: () => import('@/views/profile/friends/Friends.vue'),
          meta: {
            title: prefix + 'Друзья',
            needsSignIn: true,
            hero: 'Друзья'
          }
        },

        {
          path: 'workouts',
          name: 'workouts',
          component: () => import('@/views/profile/workout/Workouts.vue'),
          meta: {
            title: prefix + 'Тренировки',
            needsSignIn: true,
            hero: 'Тренировки'
          }
        },
        {
          path: 'trainingplan',
          name: 'trainingplan',
          component: () =>
            import('@/views/profile/trainingplan/Trainingplan.vue'),
          meta: {
            title: prefix + 'План тренировок',
            needsSignIn: true,
            hero: 'План тренировок'
          }
        },
        {
          path: 'achievements',
          name: 'achievements',
          component: () => import('@/views/profile/Achievements.vue'),
          meta: {
            title: prefix + 'Успехи',
            needsSignIn: true,
            hero: 'Успехи'
          }
        },
        {
          path: 'telegram',
          name: 'telegram',
          component: () => import('@/views/profile/Telegram.vue'),
          meta: {
            title: prefix + 'Telegram',
            needsSignIn: true,
            hero: 'Telegram'
          }
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: () => import('@/views/profile/Trainingstatistics.vue'),
          meta: {
            title: prefix + 'Статистика тренировок',
            needsSignIn: true,
            hero: 'Статистика тренировок'
          }
        },
        {
          path: 'recipes',
          name: 'recipes',
          component: () => import('@/views/profile/recipe/Recipes.vue'),
          meta: {
            title: prefix + 'Рецепты',
            needsSignIn: true,
            hero: 'Рецепты'
          }
        },
        {
          path: 'recipes/submit',
          name: 'submit-recipe',
          component: () => import('@/views/profile/recipe/SubmitRecipe.vue'),
          meta: {
            title: prefix + 'Создать рецепт',
            needsSignIn: true,
            hero: 'Создание',
            backTitle: 'Рецепты',
            backRoute: 'recipes'
          }
        },
        {
          path: 'exercises',
          name: 'exercises',
          component: () => import('@/views/profile/exercise/Exercises.vue'),
          meta: {
            title: prefix + 'Упражнения',
            needsSignIn: true,
            hero: 'Упражнения'
          }
        },
        {
          path: 'exercises/submit',
          name: 'submit-exercise',
          component: () =>
            import('@/views/profile/exercise/SubmitExercise.vue'),
          meta: {
            title: prefix + 'Создать упражнение',
            needsSignIn: true,
            hero: 'Создание',
            backTitle: 'Упражнения',
            backRoute: 'home'
          }
        },

        {
          path: 'nutritionplans',
          name: 'nutritionplans',
          component: () =>
            import('@/views/profile/nutritionplans/Nutritionplans.vue'),
          meta: {
            title: prefix + 'Планы питания',
            needsSignIn: true,
            groups: ['Admin', 'Moderator'],
            hero: 'Планы питания'
          }
        },
        {
          path: 'nutritionplans/submit',
          name: 'submit-nutritionplan',
          component: () =>
            import('@/views/profile/nutritionplans/SubmitNutritionplan.vue'),
          meta: {
            title: prefix + 'Составить план питания',
            needsSignIn: true,
            groups: ['Admin', 'Moderator'],
            hero: 'Создание плана',
            backTitle: 'Планы',
            backRoute: 'nutritionplans'
          }
        },
        {
          path: 'nutritionplans/:id',
          name: 'edit-nutritionplan',
          component: () =>
            import('@/views/profile/nutritionplans/EditNutritionplan.vue'),
          meta: {
            title: prefix + 'Редактировать план питания',
            needsSignIn: true,
            groups: ['Admin', 'Moderator'],
            hero: 'Редактировать план',
            backTitle: 'Планы',
            backRoute: 'nutritionplans'
          }
        },

        {
          path: 'management/submissions',
          name: 'exercise-submissions',
          component: () =>
            import('@/views/profile/management/ExerciseSubmissions.vue'),
          meta: {
            title: prefix + 'Представленные упражнения',
            needsSignIn: true,
            groups: ['Admin', 'Moderator'],
            hero: 'Представленные упражнения'
          }
        },
        {
          path: 'management/statistics',
          name: 'mgmt-statistics',
          component: () => import('@/views/profile/management/Statistics.vue'),
          meta: {
            title: prefix + 'Статистика',
            needsSignIn: true,
            groups: ['Admin', 'Moderator'],
            hero: 'Статистика'
          }
        },
        {
          path: 'management/suspend-user',
          name: 'mgmt-suspend-user',
          component: () => import('@/views/profile/management/SuspendUser.vue'),
          meta: {
            title: prefix + 'Блокировка пользователей',
            needsSignIn: true,
            groups: ['Admin', 'Moderator'],
            hero: 'Блокировка пользователей'
          }
        },
        {
          path: 'management/promote-user',
          name: 'mgmt-promote-user',
          component: () => import('@/views/profile/management/PromoteUser.vue'),
          meta: {
            title: prefix + 'Пользователи транспорта',
            needsSignIn: true,
            groups: ['Admin'],
            hero: 'Пользователи транспорта'
          }
        },
        {
          path: 'management/variables',
          name: 'mgmt-variables',
          component: () => import('@/views/profile/management/Variables.vue'),
          meta: {
            title: prefix + 'Переменные',
            needsSignIn: true,
            groups: ['Admin', 'Moderator'],
            hero: 'Переменные'
          }
        },
        { path: '*', redirect: { name: 'profile' } }
      ]
    },
    {
      path: '/training',
      component: () => import('@/views-interim/Training-Interim.vue'),
      children: [
        {
          path: '',
          name: 'training',
          component: () => import('@/views/training/Training.vue'),
          meta: {
            title: prefix + 'Тренировки',
            hero: 'Тренировки'
          }
        },
        {
          path: 'guide',
          name: 'muscle-guide',
          component: () => import('@/views/training/Guide.vue'),
          meta: {
            title: prefix + 'Тренировки',
            hero: 'Тренировки'
          }
        },
        {
          path: 'muscle/:muscle',
          name: 'muscle-exercises',
          component: () => import('@/views/training/Muscle.vue'),
          meta: {
            title: prefix + 'Мышцы',
            hero: 'Мышцы'
          }
        },
        {
          path: 'search-results',
          name: 'exercise-search-results',
          component: () => import('@/components/FHSearchResults.vue'),
          meta: {
            title: prefix + 'Результаты поиска',
            hero: 'Результаты поиска',
            backTitle: 'Поиск',
            backRoute: 'search-exercise'
          }
        },
        { path: '*', redirect: { name: 'training' } }
      ]
    },
    {
      path: '/nutrition',
      component: () => import('@/views-interim/Nutrition-Interim.vue'),
      children: [
        {
          path: '',
          name: 'nutrition',
          component: () => import('@/views/nutrition/Nutrition.vue'),
          meta: {
            title: prefix + 'Питание',
            hero: 'Рецепты'
          }
        },
        {
          path: 'wiki',
          name: 'nutrition-wiki',
          component: () => import('@/views/nutrition/Wiki.vue'),
          meta: {
            title: prefix + 'Вики по питанию',
            hero: 'Вики по питанию'
          }
        },
        {
          path: 'category/:category',
          name: 'recipe-category',
          component: () => import('@/views/nutrition/Category.vue'),
          meta: {
            title: prefix + 'Категория',
            hero: 'Категория'
          }
        },
        {
          path: 'search-results',
          name: 'recipe-search-results',
          component: () => import('@/components/FHSearchResults.vue'),
          meta: {
            title: prefix + 'Результаты поиска',
            hero: 'Результаты поиска',
            backTitle: 'Поиск',
            backRoute: 'search-recipe'
          }
        },
        { path: '*', redirect: { name: 'nutrition' } }
      ]
    },
    {
      path: '/',
      component: () => import('@/views-interim/Home-Interim.vue'),
      name: 'home',
      meta: {
        title: prefix + 'Главная',
        hero: 'FitnessHub'
      }
    },
    { path: '*', redirect: { name: 'home' } }
  ]
});

export default router;

export function getTitle(route: Route = router.currentRoute): string {
  const name: string = route.meta.title;
  if (!name) prefix;
  return name;
}
