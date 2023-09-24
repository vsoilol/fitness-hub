<template>
  <div class="view-exercise-submission">
    <FHHeader v-if="exercise" :title="exercise.title" :trigger="250">
      <FHFullScreenCloser @click="close()" />
    </FHHeader>
    <FHSwipeable @swipeDown="close()">
      <tc-hero :dark="$store.getters.darkmode">
        <img v-if="exercise" :src="exercise.thumbnail" slot="background" />
        <tl-flow v-else flow="column">
          <tc-spinner
            variant="dots-spin"
            size="30"
            :dark="$store.getters.darkmode"
          />
          <p>Упражнение нагружает...</p>
        </tl-flow>
      </tc-hero>
    </FHSwipeable>
    <div content v-if="exercise">
      <FHExerciseForm @close="close()" :exercise="exercise" />
    </div>
  </div>
</template>

<script lang="ts">
import FHFullScreenCloser from '@/components/FHFullScreenCloser.vue';
import FHHeader from '@/components/FHHeader.vue';
import FHSwipeable from '@/components/FHSwipeable.vue';
import FHExerciseForm from '@/components/forms/FHExerciseForm.vue';
import { ExerciseManagement } from '@/utils/ExerciseManagement';
import { closeFullscreen } from '@/utils/functions';
import { IFHNotification, IExercise } from '@/utils/interfaces';
import { NotificationManagement } from '@/utils/NotificationManagement';
import { UserManagement } from '@/utils/UserManagement';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    FHHeader,
    FHSwipeable,
    FHFullScreenCloser,
    FHExerciseForm
  }
})
export default class ExerciseSubmission extends Vue {
  public exercise: IExercise | null = null;

  async mounted() {
    const ID = this.$route.params.id;
    const user = UserManagement.getUser();
    if (!user || !['admin', 'moderator'].includes(user.group.toLowerCase())) {
      this.close({
        title: 'Отсутствие авторизации',
        text: 'Вы не можете выполнить это действие'
      });
    } else {
      await ExerciseManagement.loadSubmissions();
      const creations = ExerciseManagement.getSubmissions() || [];
      this.exercise = creations.filter(x => x._id === ID)[0];
      if (!this.exercise) {
        this.notFound();
      }
    }
  }

  public close(errorMessage?: IFHNotification) {
    if (errorMessage) {
      NotificationManagement.sendNotification(
        errorMessage.title,
        errorMessage.text
      );
    }
    closeFullscreen('exercises');
  }

  public notFound(): void {
    this.close({
      title: 'Безуспешный поиск',
      text: 'Указанное упражнение не может быть найдено'
    });
  }
}
</script>

<style lang="scss" scoped>
.view-exercise-submission {
  min-height: 100vh;

  [content] {
    padding-top: 0;
  }
}
</style>
