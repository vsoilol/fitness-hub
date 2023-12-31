<template>
  <div
    class="fh-graph-card fh-graph-time-w"
    v-if="average.hours + average.minutes > 0"
  >
    <FHGraphHead average="Trainingszeit" :description="description" />
    <div class="time-container">
      <div class="average-text" :style="averageStyle">Среднее</div>
      <div class="average-bar" :style="averageStyle" />
      <div class="average-time" :style="averageStyle">
        {{ average.hours }}<span>h</span> {{ average.minutes }}<span>m</span>
      </div>
      <div class="bar-wrapper">
        <div
          class="bar"
          v-for="(t, i) in times"
          :key="i"
          :style="getStyle(i)"
        />
        <div class="day" v-for="(d, i) in days" :key="d + i">{{ d }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { days } from '@/utils/constants';
import { TrainingStatistics } from '@/utils/Trainingstatistics';
import { Vue, Component, Prop } from 'vue-property-decorator';
import FHGraphHead from './FHGraphHead.vue';

@Component({
  components: {
    FHGraphHead
  }
})
export default class FHGraphTimeW extends Vue {
  @Prop() chartData!: number[][];

  public height = 125;

  get chart(): number[][] {
    return this.chartData || TrainingStatistics.getChartData();
  }

  get times(): number[] {
    return this.chart
      .filter((x, i) => i > 20)
      .map(x => Math.floor(x.reduce((a, b) => a + b, 0) / 60));
  }

  get days(): string[] {
    return [...days, ...days]
      .filter((_x, i) => i > new Date().getDay())
      .filter((_x, i) => i < 7)
      .map(x => x.substring(0, 1));
  }

  get description(): string {
    if (this.chartData)
      return `Среднее время тренировки за последние 7 дней: ${this.average.hours}h ${this.average.minutes}m`;
    return `За последние 7 дней Вы в среднем ${this.average.hours}h ${this.average.minutes}m обучен.`;
  }

  get average(): { minutes: number; hours: number } {
    const mins = Math.round(this.times.reduce((a, b) => a + b, 0) / 7);
    return {
      hours: Math.floor(mins / 60),
      minutes: mins % 60
    };
  }

  getStyle(index: number): Record<string, unknown> {
    return {
      height: (this.times[index] / Math.max(...this.times)) * this.height + 'px'
    };
  }

  get averageStyle(): Record<string, unknown> {
    return {
      bottom:
        (this.times.reduce((a, b) => a + b, 0) / 7 / Math.max(...this.times)) *
          this.height +
        'px'
    };
  }
}
</script>

<style lang="scss" scoped>
.fh-graph-time-w {
  .time-container {
    display: flex;
    position: relative;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 27.5px;

    .average-bar,
    .average-time,
    .average-text {
      left: 0;
      right: 0;
      position: absolute;
      transform: translateY(50%);
    }
    .average-bar {
      background: $success;
      height: 5px;
      border-radius: $border-radius;
      margin-bottom: 17.5px;
    }
    .average-time {
      margin-bottom: -2.5px;
      font-size: 1.5em;
      font-weight: bold;
      span {
        font-weight: normal;
        font-size: 16px;
      }
    }
    .average-text {
      margin-bottom: 32.5px;
      opacity: 0.5;
    }
    .bar-wrapper {
      display: grid;
      grid-template-columns: repeat(7, 12.5px);
      grid-gap: 5px 15px;
      grid-template-rows: 1fr 12.5px;
      .bar {
        display: flex;
        align-self: baseline;
        border-radius: $border-radius;

        background: $container;
        @media (prefers-color-scheme: dark) {
          background: $container_dark;
        }
      }
      .day {
        opacity: 0.75;
      }
    }
  }
}
</style>
