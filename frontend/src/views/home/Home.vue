<template>
  <div class="view-home" content>
    <div max-width>
      <tl-flow class="header" horizontal="start">
        <tl-flow>
          <img src="assets/fh.svg" alt="" />
        </tl-flow>
        <h1>О нас</h1>
      </tl-flow>

      <p>
        FitnessHub - это онлайн-оазис для всех любителей спорта, бездельников и
        профессионалов, которые, независимо от пола, возраста и уровня
        физической подготовки, хотят выбрать здоровый, активный и более
        осознанный образ жизни. Представляя собой сочетание приложения для
        тренировок и питания, FitnessHub предоставляет цифровые и индивидуальные
        рекомендации по достижению личных целей в фитнесе.
      </p>
      <!-- 
      <section :dark="$store.getters.darkmode">
        <div class="subtitle">Создавать, планировать, делиться</div>
        <div class="title">Тренировки</div>
        <tl-grid minWidth="250" arrangement="auto-fill">
          <FHSectionCardNormal
            title="Планы тренировок"
            description="Составьте планы тренировок, которые помогут вам достичь поставленной цели."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/d5046e80-7c73-4451-b77d-2ce227bed325.webp"
          />
          <FHSectionCardNormal
            title="Упражнения"
            description="Создавайте упражнения для дополнения своих тренировочных планов."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/61f36135-74a0-41ac-b507-5de68ffc1a6f.webp"
          />
          <FHSectionCardNormal
            title="Таймер / секундомер"
            description="Установите таймер для выполнения упражнения. Запустите секундомер."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/d3c6ae79-ed37-451f-bfa7-6955d8dd6e46.webp"
          />
        </tl-grid>
        <div class="spacer" />
      </section>

      <section :dark="$store.getters.darkmode">
        <div class="subtitle">Рецепты, советы и многое другое</div>
        <div class="title">Питание</div>
        <tl-grid minWidth="250" arrangement="auto-fill">
          <FHSectionCardNormal
            title="Планы питания"
            description="Планы питания помогут вам достичь фигуры своей мечты."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/58a3a831-8543-4d64-87d3-4926f0918f0f.webp"
          />
          <FHSectionCardNormal
            title="Рецепты"
            description="Найдите кулинарные рецепты, которые поддержат ваши тренировки и помогут вам сбросить вес."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/4ad31460-0148-4432-8213-2f1c282ca636.webp"
          />
          <FHSectionCardNormal
            title="Вики по питанию"
            description="Узнайте о советах по питанию, которые помогут вам сделать вашу повседневную жизнь более здоровой."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/3e5f7126-1dad-4894-8874-fd45e7b5342d.webp"
          />
          <FHSectionCardNormal
            title="Счётчик выпитой воды"
            description="Оставайтесь увлажненными!"
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/33e92901-df23-42df-ae38-7930f588fbe0.webp"
          />
        </tl-grid>
        <div class="spacer" />
      </section>

      <section :dark="$store.getters.darkmode">
        <div class="subtitle">Отслеживать, сравнивать, улучшать</div>
        <div class="title">Статистика</div>
        <tl-grid minWidth="250" arrangement="auto-fill">
          <FHSectionCardNormal
            title="Статистика тренировок"
            description="Посмотрите, сколько вы уже тренировались. Сравните его со своей историей тренировок."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/d7b126b7-4969-466c-8678-2ad561bad76f.webp"
          />

          <FHSectionCardNormal
            title="Вес трека"
            description="Отслеживайте свой вес, чтобы следить за своим прогрессом."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/366c7d65-ec8e-4768-aa36-9b0687b44ca3.webp"
          />
        </tl-grid>
        <div class="spacer" />
      </section>

      <section :dark="$store.getters.darkmode">
        <div class="subtitle">Лучше вместе</div>
        <div class="title">Друзья</div>
        <tl-grid minWidth="250" arrangement="auto-fill">
          <FHSectionCardNormal
            title="Добавить друзей"
            description="Добавляйте друзей в свой FitnessHub."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/49f46de3-e750-4e3f-96cd-55773848218e.webp"
          />
          <FHSectionCardNormal
            title="Чат"
            description="Общайтесь с друзьями в прямом эфире через FitnessHub."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/e30eddae-4161-4d00-9c8c-7208bd06fc9d.webp"
          />
          <FHSectionCardNormal
            title="Просмотр профиля"
            description="Просмотрите профили своих друзей."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/4d498130-ee6f-4888-b141-cf30e6cd93f1.webp"
          />
          <FHSectionCardNormal
            title="Telegram"
            description="Следите за новостями Fitnesshub с помощью Telegram."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/6bf7d3e5-bf7e-4b6c-a159-7b77557cc6db.webp"
          />
        </tl-grid>
        <div class="spacer" />
      </section>

      <section :dark="$store.getters.darkmode">
        <div class="subtitle">Новости и успехи</div>
        <div class="title">Новости</div>
        <tl-grid minWidth="250" arrangement="auto-fill">
          <FHSectionCardNormal
            title="Лента активности"
            description="Следите за деятельностью своих друзей и узнавайте о новинках."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/5282a185-aad2-4f9d-810d-b10025263c6a.webp"
          />
          <FHSectionCardNormal
            title="Разблокировать достижения"
            description="Разблокируйте достижения для различных целей и делитесь ими через ленту."
            asset="https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/406018b0-13df-44b5-9bc1-b5045ef097d2.webp"
          />
        </tl-grid>
        <div class="spacer" />
      </section> -->
    </div>
  </div>
</template>

<script lang="ts">
import FHSectionCardLarge from '@/components/home/FHSectionCardLarge.vue';
import FHSectionCardNormal from '@/components/home/FHSectionCardNormal.vue';
import { IExercise } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    FHSectionCardNormal,
    FHSectionCardLarge
  }
})
export default class Home extends Vue {
  public ex: IExercise = {
    steps: ['Имитирует бег на лыжах'],
    warnings: ['Защита суставов', 'Тренировка выносливости', 'Снижение веса'],
    affectedMuscles: ['Кардио', 'Полное тело', 'Ягодичная мышца', 'Бедро'],
    _id: '5f573424b3bda65094e5a4bb',
    title: 'Arc Trainer',
    thumbnail: 'https://cdn2.pixstash.net/2020/09/09/1uxvm.jpg',
    difficulty: 1,
    distance: '5 km',
    created: 1599550500990,
    reviewedBy: '5f47a68688e01f1eaa1881d9',
    reviewed: true,
    updated: 1614805273365,
    author: '5f47a68688e01f1eaa1881d9',
    kneeFriendly: true
  };
}
</script>

<style lang="scss" scoped>
.view-home {
  .header {
    .tl-flow {
      margin-right: 10px;
      img {
        height: 40px;
        filter: brightness(0%);
        @media #{$isDark} {
          filter: brightness(100%);
        }
      }
    }
  }
  section {
    animation: move-up 0.4s ease-in-out 0.3s both;
    background: $paragraph;
    &[dark] {
      background: $paragraph_dark;
    }
    text-align: center;
    border-radius: $border-radius;
    margin: 30px -5vw;
    padding: 20px 5vw 0;
    .spacer {
      height: 5vw;
      max-height: 60px;
    }
    .spacer-small {
      height: 30px;
    }
    .title,
    .subtitle {
      text-align: center;
    }
    .title {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 30px;
    }
    .subtitle {
      font-size: 13px;
      font-weight: bold;
      opacity: 0.75;
      margin-top: 10px;
      text-transform: uppercase;
    }
  }
}

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
</style>
