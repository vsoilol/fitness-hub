<template>
  <FHPreview
    v-if="exercise"
    class="fh-exercise-preview"
    @click="handleClick"
    :title="exercise.title"
  >
    <img slot="media" :src="exercise.thumbnail" alt="" />
    <div class="level">
      <span>Уровень</span>
      <i
        v-for="(k, i) in Array(exercise.difficulty)"
        :key="i"
        class="ti-circle"
        :difficulty="exercise.difficulty"
      />
    </div>
    <template slot="action" v-if="exercise.reviewed">
      <tc-action-item
        success
        icon="share"
        title="Поделиться"
        @click="$sE(exercise)"
      />

      <tc-action-item icon="plus" title="Тренировка" @click="addToWo" />
      <tc-action-item icon="list" title="Список" @click="$aTL(exercise)" />
      <tc-action-item
        icon="i-circle-filled"
        title="Подробнее"
        @click="handleClick"
      />
      <tc-action-item
        v-if="isAuthor"
        alarm
        title="Редактирование упражнения"
        icon="pencil"
        @click="updateExercise"
      />
    </template>
    <template v-else-if="$route.name === 'exercise-submissions'">
      <tc-action-item
        icon="pencil"
        title="Запрос на редактирование"
        @click="handleClick"
      />
    </template>
    <template v-else>
      <tc-action-item
        error
        icon="trashcan-alt"
        title="Удалить упражнение"
        @click="cancelSubmission"
      />
    </template>
  </FHPreview>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { ExerciseManagement } from '@/utils/ExerciseManagement';
import { openFullscreen } from '@/utils/functions';
import { IExercise } from '@/utils/interfaces';
import { UserManagement } from '@/utils/UserManagement';
import { Vue, Component, Prop } from 'vue-property-decorator';
import FHPreview from '../FHPreview.vue';

@Component({
  components: {
    FHPreview
  }
})
export default class FHExercisePreview extends Vue {
  @Prop() exercise!: IExercise;

  get isAuthor(): boolean {
    if (!this.exercise) return false;
    return this.exercise.author === UserManagement.getUserID();
  }

  public handleClick(e: Event) {
    this.$emit('click', e);
    if (
      this.exercise &&
      this.exercise.reviewed &&
      this.$route.name !== 'exercise-submissions'
    ) {
      openFullscreen('exercise-details', { id: this.exercise._id });
    }
  }

  public updateExercise(): void {
    if (this.isAuthor) {
      openFullscreen('update-exercise', { id: this.exercise._id });
    }
  }

  public addToWo(): void {
    if (this.exercise) {
      ExerciseManagement.addToWorkout(this.exercise);
    }
  }

  public cancelSubmission(): void {
    if (this.exercise) {
      backend
        .delete('exercise/cancelSubmission/' + this.exercise._id)
        .then(() => {
          ExerciseManagement.loadCreated();
          ExerciseManagement.loadSubmissions();
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.fh-exercise-preview {
  .level {
    margin-left: 10px;
    opacity: 0.7;
    span {
      font-size: 14px;
    }
    i {
      margin-left: 5px;
      font-size: 10px;

      &[difficulty='1'] {
        color: $success;
      }
      &[difficulty='2'] {
        color: $alarm;
      }
      &[difficulty='3'] {
        color: $error;
      }
    }
  }
}
</style>
