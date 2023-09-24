<template>
  <div
    v-if="lastWeek !== 0 && thisWeek !== 0"
    class="fh-graph-card fh-graph-time-c"
    :style="'--perc-min:' + percOfMin"
  >
    <FHGraphHead average="Trainigszeit" :description="description" />
    <tc-divider :dark="$store.getters.darkmode" />
    <div class="time-bar first" :class="{ min: isThisMin }">
      <div class="title">{{ thisWeek }}<span>мин/день</span></div>
      <div class="bar">На этой неделе</div>
    </div>
    <div class="time-bar" :class="{ min: isLastMin }">
      <div class="title">{{ lastWeek }}<span>мин/день</span></div>
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
export default class FHGraphTimeC extends Vue {
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
    return Math.round(
      this.chart
        .filter((x, i) => i >= start && i <= end)
        .reduce(
          (prev, times) => prev + times.reduce((x, y) => x + y, 0) / 60,
          0
        ) / 7
    );
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
    if (this.chartData)
      return 'Сравнение времени тренировок за последние 2 недели';
    const diff = this.thisWeek - this.lastWeek;
    if (diff < 0)
      return 'На этой неделе вы тренировались меньше, чем на прошлой. Выкладывайтесь на полную, и у вас все получится!';
    if (diff > 0)
      return (
        'Высокие показатели ' +
        UserManagement.getName() +
        '! На этой неделе вы тренировались больше, чем на прошлой.'
      );
    return 'На этой неделе вы тренировались столько же минут, сколько и на прошлой. Очень хорошо!';
  }
}
</script>

<style lang="scss" scoped>
.fh-graph-time-c {
  .time-bar {
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
