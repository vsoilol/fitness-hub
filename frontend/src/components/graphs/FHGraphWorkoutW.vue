<template>
  <div
    v-if="lastWeek !== 0 && thisWeek !== 0"
    class="fh-graph-card fh-graph-workout-w"
    :style="'--perc-min:' + percOfMin"
  >
    <FHGraphHead average="Workouts" :description="description" />
    <tc-divider :dark="$store.getters.darkmode" />
    <div class="workout-bar first" :class="{ min: isThisMin }">
      <div class="title">{{ thisWeek }}<span>Тренировки</span></div>
      <div class="bar">На этой неделе</div>
    </div>
    <div class="workout-bar" :class="{ min: isLastMin }">
      <div class="title">{{ lastWeek }}<span>Тренировки</span></div>
      <div class="bar">На прошлой неделе</div>
    </div>
  </div>
</template>

<script lang="ts">
import { TrainingStatistics } from '@/utils/Trainingstatistics';
import { UserManagement } from '@/utils/UserManagement';
import { Vue, Component, Prop } from 'vue-property-decorator';
import FHGraphHead from './FHGraphHead.vue';

@Component({
  components: {
    FHGraphHead
  }
})
export default class FHGraphWorkoutW extends Vue {
  @Prop() chartData!: number[][];

  get chart(): number[][] {
    return this.chartData || TrainingStatistics.getChartData();
  }

  get thisWeek(): number {
    return this.getWorkoutAmount(21, 27);
  }
  get lastWeek(): number {
    return this.getWorkoutAmount(14, 20);
  }

  getWorkoutAmount(start: number, end: number): number {
    return this.chart
      .filter((_x, i) => i >= start && i <= end)
      .reduce((a, b) => a + b.length, 0);
  }

  get percOfMin(): string {
    return (
      (Math.min(this.thisWeek, this.lastWeek) /
        Math.max(this.thisWeek, this.lastWeek)) *
        100 +
      '%'
    );
  }
  get isThisMin() {
    return this.thisWeek < this.lastWeek;
  }
  get isLastMin() {
    return this.thisWeek > this.lastWeek;
  }

  get description(): string {
    if (this.chartData) return 'Сравнение учебных блоков за последние 2 недели';
    const diff = this.thisWeek - this.lastWeek;
    if (diff < 0)
      return 'На этой неделе вы сделали меньше тренировок, чем на прошлой. Выкладывайтесь на полную, и у вас все получится!';
    if (diff > 0)
      return (
        'Высокие показатели ' +
        UserManagement.getName() +
        '! На этой неделе вы сделали больше тренировок, чем на прошлой.'
      );
    return 'На этой неделе вы сделали столько же тренировок, сколько и на прошлой. Очень хорошо!';
  }
}
</script>

<style lang="scss" scoped>
.fh-graph-workout-w {
  .workout-bar {
    &:not(.first) {
      margin-top: 10px;
    }
    &.first {
      .bar {
        background: $success;
        color: #fff;
      }
    }
    .title {
      font-size: 1.5em;
      font-weight: bold;
      span {
        font-size: 16px;
        margin-left: 3px;
        opacity: 0.75;
      }
    }
    &.min .bar {
      width: calc(var(--perc-min) - 20px);
    }
    .bar {
      margin-top: 5px;
      font-size: 14px;
      padding: 5px 10px;
      border-radius: $border-radius;

      background: $container;
      @media (prefers-color-scheme: dark) {
        background: $container_dark;
      }
    }
  }
}
</style>
