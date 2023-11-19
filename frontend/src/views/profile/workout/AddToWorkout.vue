<template>
  <div class="view-add-to-workout">
    <div content max-width>
      <FHHeader title="Добавить упражнение">
        <FHFullScreenCloser @click="$cFS('training')" />
      </FHHeader>
      <br />
      <h1 center>Добавить упражнение</h1>
      <br />
      <template v-if="exercise">
        <tl-flow flow="column">
          <tc-avatar :src="exercise.thumbnail" />
          <h2>{{ exercise.title }}</h2>
        </tl-flow>

        <tc-divider :dark="true" />

        <tl-flow horizontal="space-between">
          <h3>Выберите тренировку</h3>
          <tc-button
            background="white"
            variant="opaque"
            icon="plus"
            name="создать"
            @click="$oFS('create-workout')"
          />
        </tl-flow>

        <p v-if="!workouts || workouts.length === 0" center>
          Вы еще не создали тренировку, чтобы добавить в нее это упражнение
        </p>
        <FHList v-else>
          <FHListItem
            v-for="w in workouts"
            :key="w._id"
            :avatar="w.exercises[0].thumbnail"
            :title="w.title"
            :subtitle="getSubtitle(w)"
          >
            <tc-button
              :disabled="isSubmitting"
              name="выберите"
              tfbackground="success"
              @click="useWorkout(w)"
            />
          </FHListItem>
        </FHList>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import FHFullScreenCloser from '@/components/FHFullScreenCloser.vue';
import FHHeader from '@/components/FHHeader.vue';
import FHList from '@/components/list/FHList.vue';
import FHListItem from '@/components/list/FHListItem.vue';
import backend from '@/utils/backend';
import { CreateWorkoutDTO } from '@/utils/dtos';
import { closeFullscreen } from '@/utils/functions';
import { IExerciseInfo, IWorkout } from '@/utils/interfaces';
import { NotificationManagement } from '@/utils/NotificationManagement';
import { UserManagement } from '@/utils/UserManagement';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    FHHeader,
    FHFullScreenCloser,
    FHList,
    FHListItem
  }
})
export default class AddToWorkout extends Vue {
  public isSubmitting = false;

  created() {
    if (!this.exercise) {
      closeFullscreen('training');
    }
  }

  get exercise(): IExerciseInfo | null {
    return this.$store.getters.addToWorkout;
  }

  get workouts(): IWorkout[] | null {
    return UserManagement.getWorkouts();
  }

  getSubtitle(workout: IWorkout): string {
    const { length } = workout.exercises;
    if (length === 1) return length + ' Упражнение';
    if (length >= 2 && length <= 4) return length + ' Упражнения';
    return length + ' Упражнений';
  }

  public async useWorkout(w: IWorkout): Promise<void> {
    if (!w) return;
    const e = this.exercise;
    if (!e) return;
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const dto: CreateWorkoutDTO = {
      title: w.title,
      exercises: [...w.exercises.map(x => x._id), e._id]
    };

    backend
      .put('workout/' + w._id, dto)
      .then(res => {
        UserManagement.addWorkout(res.data);
        NotificationManagement.sendNotification(
          'Добавлено упражнение',
          'Упражнение ' +
            e.title +
            ' стал тренировкой ' +
            w.title +
            ' добавлено',
          undefined,
          e.thumbnail
        );
      })
      .catch(() => {
        NotificationManagement.sendNotification(
          'Ошибка при сохранении',
          'Упражнение ' +
            e.title +
            ' к сожалению, не смог приехать на тренировку ' +
            w.title +
            ' быть добавленным',
          undefined,
          e.thumbnail
        );
      })
      .finally(() => {
        closeFullscreen('training');
      });
  }
}
</script>

<style lang="scss" scoped>
.view-add-to-workout {
  min-height: 100vh;
  color: #fff;

  background: linear-gradient(rgba($color, 0.6), rgba($color, 0.2)),
    url('/assets/workout-bg.webp');
  background-size: cover;
  background-position: center center;

  [content] {
    padding-bottom: 20px;
  }

  .fh-list-item {
    background: rgba($color, 0.8);
    color: #fff;
    .tc-button {
      border-radius: 50px;
      margin-right: -5px;
    }
  }
}
</style>
