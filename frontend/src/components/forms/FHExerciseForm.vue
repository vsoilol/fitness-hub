<template>
  <div class="view-exercise-form" content>
    <FHErrorList :id="errorList" />
    <div max-width>
      <h3 v-if="mode === 'create'">Создать упражнение</h3>
      <h3 v-if="mode === 'update'">Редактирование упражнения</h3>
      <h3 v-if="mode === 'change'">Проверьте изменения</h3>
      <h3 v-if="mode === 'publish'">Опубликовать упражнение</h3>

      <tc-segments :dark="$store.getters.darkmode" v-model="segment">
        <tc-segment-item title="Информация" />
        <tc-segment-item title="Тип" />
        <tc-segment-item title="Необязательно" />
      </tc-segments>

      <div class="spacer" />

      <FHAppear>
        <div v-if="segment == 0">
          <tc-input
            title="Название упражнения"
            v-model="dto.title"
            :dark="$store.getters.darkmode"
          />
          <tc-input
            title="Предварительное изображение"
            v-model="dto.thumbnail"
            :dark="$store.getters.darkmode"
          />
          <div class="title">Активная мышца/ы</div>
          <tc-select
            :dark="$store.getters.darkmode"
            tfbackground="success"
            @selectedItems="m => (dto.affectedMuscles = m)"
            :multiple="true"
            placeholder="Выберите одну или несколько мышц"
          >
            <tc-select-item
              v-for="m in muscles"
              :key="m"
              :defaultSelected="dto.affectedMuscles.includes(m)"
              :title="m"
            />
          </tc-select>
          <div class="title" sub>Сложность</div>
          <tc-slider
            :min="1"
            :max="3"
            tfcolor="success"
            iconStart="dot"
            iconEnd="circle"
            v-model="dto.difficulty"
          />
        </div>
      </FHAppear>

      <FHAppear>
        <div v-if="segment == 1">
          <div sub style="font-style: italic; opacity: .5">
            Здесь достаточно заполнить соответствующие реквизиты в разделе
          </div>

          <tc-divider
            :dark="$store.getters.darkmode"
            name="Тренировки в тренажерном зале"
          />
          <div class="title" sub>Подходы | мин - макс</div>
          <tl-grid gap="0" minWidth="30">
            <tc-input
              type="number"
              min="1"
              step="1"
              v-model="dto.sets.min"
              :dark="$store.getters.darkmode"
            />
            <tc-input
              type="number"
              step="1"
              v-model="dto.sets.max"
              :dark="$store.getters.darkmode"
            />
          </tl-grid>

          <div class="title" sub>Повторы | мин - макс</div>
          <tl-grid gap="0" minWidth="30" sub>
            <tc-input
              type="number"
              min="1"
              step="1"
              v-model="dto.reps.min"
              :dark="$store.getters.darkmode"
            />
            <tc-input
              type="number"
              step="1"
              v-model="dto.reps.max"
              :dark="$store.getters.darkmode"
            />
          </tl-grid>

          <tc-divider
            :dark="$store.getters.darkmode"
            name="Упражнение на время"
          />
          <div class="title" sub>Рекомендуемая продолжительность</div>
          <div sub>
            <tc-input
              type="number"
              :dark="$store.getters.darkmode"
              v-model="dto.time"
              min="0"
              step="1"
            />
          </div>

          <tc-divider
            :dark="$store.getters.darkmode"
            name="Упражнения на дистанции"
          />
          <div class="title" sub>Рекомендуемая дистанция</div>
          <tc-input
            :dark="$store.getters.darkmode"
            placeholder="Пример: 5 км"
            v-model="dto.distance"
          />
        </div>
      </FHAppear>

      <FHAppear>
        <div v-if="segment == 2">
          <tc-input
            title="Видеоурок"
            v-model="dto.explanatoryVideo"
            :dark="$store.getters.darkmode"
          />

          <tl-grid minWidth="250" gap="0 20">
            <div>
              <div class="title" sub>Выполняется в домашних условиях</div>
              <tc-checkbox
                :dark="$store.getters.darkmode"
                v-model="dto.possibleAtHome"
                title="Подходит для выполнения дома"
                tfbackground="success"
              />
            </div>
            <div>
              <div class="title" sub>Удобство для коленей</div>
              <tc-checkbox
                :dark="$store.getters.darkmode"
                v-model="dto.kneeFriendly"
                title="Удобство для коленей"
                tfbackground="success"
              />
            </div>
          </tl-grid>

          <div class="title">Этапы выполнения</div>
          <tc-table :dark="$store.getters.darkmode">
            <tc-tr v-for="(s, i) in dto.steps" :key="'s-' + i">
              <tc-td>{{ s }}</tc-td>
              <tc-td>
                <tc-link tfcolor="error" @click="removeStep(i)">
                  удалить
                </tc-link>
              </tc-td>
            </tc-tr>
          </tc-table>
          <div class="fh-graph-card">
            <div class="title" small>Следующий шаг</div>
            <tc-textarea v-model="step" :dark="$store.getters.darkmode" />
            <tl-flow>
              <tc-link tfcolor="success" @click="addStep">
                Добавить шаг
              </tc-link>
            </tl-flow>
          </div>

          <div class="title">Примечания и предупреждения</div>
          <tc-table :dark="$store.getters.darkmode">
            <tc-tr v-for="(w, i) in dto.warnings" :key="'w-' + i">
              <tc-td>{{ w }}</tc-td>
              <tc-td>
                <tc-link tfcolor="error" @click="removeWarning(i)">
                  удалить
                </tc-link>
              </tc-td>
            </tc-tr>
          </tc-table>
          <div class="fh-graph-card">
            <div class="title" small>Еще одна подсказка</div>
            <tc-textarea v-model="warning" :dark="$store.getters.darkmode" />
            <tl-flow>
              <tc-link tfcolor="success" @click="addWarning">
                Добавить примечание
              </tc-link>
            </tl-flow>
          </div>
        </div>
      </FHAppear>

      <br />
      <tl-flow>
        <template v-if="mode === 'create'">
          <tc-button
            name="Добавить упражнение"
            tfbackground="success"
            :disabled="isSubmitting"
            @click="createExercise"
          />
        </template>
        <template v-else-if="mode === 'update'">
          <tc-button
            name="Редактировать упражнение"
            tfbackground="success"
            :disabled="isSubmitting"
            @click="updateExercise"
          />
        </template>
        <template v-else-if="mode === 'publish'">
          <tc-button
            name="Удалить запрос"
            tfbackground="error"
            :disabled="isSubmitting"
            @click="denySubmission"
          />
          <tc-button
            name="Опубликовать упражнение"
            tfbackground="success"
            :disabled="isSubmitting"
            @click="acceptExercise"
          />
        </template>

        <template v-else-if="mode === 'change'">
          <tc-button
            name="Отклонить изменения"
            tfbackground="alarm"
            :disabled="isSubmitting"
            @click="rejectChanges"
          />
          <tc-button
            name="Принять изменения"
            tfbackground="success"
            :disabled="isSubmitting"
            @click="acceptExercise"
          />
        </template>
      </tl-flow>
    </div>
  </div>
</template>

<script lang="ts">
import FHAppear from '@/components/FHAppear.vue';
import FHErrorList from '@/components/FHErrorList.vue';
import backend from '@/utils/backend';
import { CreateExerciseDTO } from '@/utils/dtos';
import { FHEventBus } from '@/utils/FHEventbus';
import { IExercise } from '@/utils/interfaces';
import { NotificationManagement } from '@/utils/NotificationManagement';
import { VariableManagement } from '@/utils/VariableManagement';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ExerciseManagement } from '@/utils/ExerciseManagement';

@Component({
  components: {
    FHAppear,
    FHErrorList
  }
})
export default class FHExeciseForm extends Vue {
  @Prop() exercise!: IExercise;

  public segment = -1;
  public isSubmitting = false;
  public step = '';
  public warning = '';
  public mode: 'update' | 'create' | 'change' | 'publish' = 'create';
  public errorList = 'exercise-form';

  public dto: CreateExerciseDTO = {
    title: '',
    affectedMuscles: [],
    thumbnail: '',
    difficulty: 1,
    warnings: [],
    steps: []
  };

  beforeMount() {
    if (!this.muscles) {
      this.$emit('close');
      NotificationManagement.sendNotification(
        'Действия в настоящее время невозможны',
        'Пожалуйста, попробуйте позже'
      );
    }
  }

  mounted() {
    this.setGym();

    if (this.exercise) {
      const ex = this.exercise;
      const edited = ex.reviewed ? ex.editedData : null;

      this.dto.title = (edited || ex).title;
      this.dto.affectedMuscles = (edited || ex).affectedMuscles;
      this.dto.thumbnail = (edited || ex).thumbnail;
      this.dto.difficulty = (edited || ex).difficulty;
      this.dto.warnings = (edited || ex).warnings || [];
      this.dto.steps = (edited || ex).steps || [];
      this.dto.explanatoryVideo = (edited || ex).explanatoryVideo;
      this.dto.possibleAtHome = (edited || ex).possibleAtHome;
      this.dto.kneeFriendly = (edited || ex).kneeFriendly;
      this.dto.time = (edited || ex).time;
      this.dto.distance = (edited || ex).distance;

      this.dto.sets =
        edited && edited.sets ? edited.sets : this.mapMinMaxString(ex.sets);
      this.dto.reps =
        edited && edited.reps ? edited.reps : this.mapMinMaxString(ex.reps);
    }

    if (!this.exercise) {
      this.mode = 'create';
    } else if (this.$route.name === 'update-exercise') {
      this.mode = 'update';
    } else if (this.$route.name === 'exercise-submission') {
      this.mode = this.exercise.reviewed ? 'change' : 'publish';
    }

    this.segment = 0;
  }

  get muscles(): string[] | null {
    return VariableManagement.getMuscleNames();
  }

  public addStep(): void {
    if (this.step.length < 10) return;
    this.dto.steps.push(this.step);
    this.step = '';
  }

  public removeStep(index: number): void {
    this.dto.steps.splice(index, 1);
  }

  public addWarning(): void {
    if (this.warning.length < 10) return;
    this.dto.warnings.push(this.warning);
    this.warning = '';
  }

  public removeWarning(index: number): void {
    this.dto.warnings.splice(index, 1);
  }

  public setGym(): void {
    (this.dto.reps = { min: 1, max: 12 }), (this.dto.sets = { min: 1, max: 4 });
  }

  public mapMinMaxString(s?: string): { min: number; max: number } {
    if (!s) return { min: 0, max: 0 };
    if (s.includes('-')) {
      const split = s.split(' - ');
      return { min: +split[0], max: +split[1] };
    }
    return { min: +s, max: +s };
  }

  public cleanDTO(): void {
    const { distance, time } = this.dto;
    if (distance && distance.length === 0) {
      delete this.dto.distance;
    }
    if (time && time <= 0) {
      delete this.dto.time;
    }
    if ((distance && distance.length > 0) || (time && time > 0)) {
      delete this.dto.sets;
      delete this.dto.reps;
    }
    this.dto.difficulty = +this.dto.difficulty;
  }

  public async createExercise(): Promise<void> {
    if (this.dto.sets) {
      this.dto.sets.min = Number(this.dto.sets.min);
      this.dto.sets.max = Number(this.dto.sets.max);
    }

    if (this.dto.reps) {
      this.dto.reps.min = Number(this.dto.reps.min);
      this.dto.reps.max = Number(this.dto.reps.max);
    }

    this.dto.time = Number(this.dto.time);

    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.cleanDTO();

    backend
      .post('exercise', this.dto)
      .then(this.handleResponse)
      .catch(this.handleCatch);
  }

  public async updateExercise() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.cleanDTO();

    backend
      .put('exercise/update/' + this.exercise._id, this.dto)
      .then(this.handleResponse)
      .catch(this.handleCatch);
  }

  public async acceptExercise() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.cleanDTO();

    backend
      .put('exercise/publish/' + this.exercise._id, this.dto)
      .then(this.handleResponse)
      .catch(this.handleCatch);
  }

  public async rejectChanges() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.cleanDTO();

    backend
      .put('exercise/rejectChanges/' + this.exercise._id)
      .then(this.handleResponse)
      .catch(this.handleCatch);
  }

  public async denySubmission() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.cleanDTO();

    backend
      .delete('exercise/' + this.exercise._id)
      .then(this.handleResponse)
      .catch(this.handleCatch);
  }

  private handleResponse(): void {
    ExerciseManagement.loadCreated();
    ExerciseManagement.loadSubmissions();
    this.$emit('close');
  }

  private handleCatch(err: { statusCode: number; message: string }): void {
    const { statusCode, message } = err;
    if (statusCode && statusCode === 422 && message) {
      FHEventBus.$emit('fh-error-list-' + this.errorList, message);
    }
    //this.setGym();
    this.isSubmitting = false;
  }
}
</script>

<style lang="scss" scoped>
.view-exercise-form {
  padding-top: 0;

  [sub] {
    margin-bottom: 15px;
  }

  .title {
    font-weight: 700;
    white-space: nowrap;
    margin: 10px 0 2px;
    margin-left: 8px;
    &[small] {
      text-align: center;
      font-size: 14px;
      margin: 0px;
      margin-bottom: 10px;
    }
  }
  .spacer {
    height: 5px;
  }

  .fh-graph-card {
    margin-top: 10px;
    .tl-flow {
      margin-top: 10px;
    }
  }

  .tc-table-2 {
    margin-top: 5px;
    /deep/ .tc-td {
      height: 30px;
    }
  }
}
</style>
