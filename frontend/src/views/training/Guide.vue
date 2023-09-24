<template>
  <div class="view-muscle-guide" content>
    <div max-width>
      <h1>Руководство по работе с мышцами</h1>
      Вы хотите улучшить форму тела и проработать проблемные зоны? Нет проблем.
      Мы отсортировали упражнения в зависимости от того, на какие мышцы они
      воздействуют - посмотрите*. <br />* Однако если вы пропустили занятия по
      анатомии и являетесь абсолютным новичком в фитнесе, то вам стоит прочитать
      этот краткий справочник по мышцам. Здесь вы узнаете, где находится
      указанная мышца и почему ее следует тренировать.

      <h2>Верхняя часть тела</h2>
      В отличие от женщин, у мужчин строительные объекты находятся в основном в
      верхней половине тела. Желание иметь рельефный живот и грудь, сильные
      плечи и широкие руки (= V-образная фигура) может быть реализовано легче,
      если знать, какие мышцы расположены в верхней части тела.
      <br />
      <br />
      <masonry :cols="{ default: 2, 600: 1 }" gutter="20px">
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Бицепс"
          id="Bizeps"
          :dark="$store.getters.darkmode"
        >
          Символ статуса для настоящих парней. Расположенная в верхней части
          руки, она имеет две мышечные нити, которые должны тренироваться с
          одинаковой силой - в противном случае могут возникнуть проблемы с
          мышцами из-за дисбаланса их силы.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Дельтовидная мышца"
          id="Deltamuskel"
          :dark="$store.getters.darkmode"
        >
          относится к группе мышц плеча и шеи. Она "упаковывает" плечевой
          сустав, придает плечу контур и формирует самую внешнюю крайнюю точку
          V-образной формы. Она отвечает за отведение руки в сторону. Если не
          уделять ей должного внимания, она также может вызывать боль в верхней
          части руки и плече. При пренебрежении им могут возникать боли в
          верхней части руки и плече.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Предплечье"
          id="Предплечье"
          :dark="$store.getters.darkmode"
        >
          Эта мышца отвечает за "теннисный локоть" и расположена на верхней
          стороне предплечья.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Широчайшая мышца"
          id="Latissimus"
          :dark="$store.getters.darkmode"
        >
          является самой крупной скелетной мышцей и располагается на боковых
          мышцах спины. При ее тренировке спина кажется шире и легче добиться
          желаемой V-образной формы.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Грудная мышца"
          id="Pectoralis"
          :dark="$store.getters.darkmode"
        >
          Грудная мышца, отвечающая за выраженность и силу грудных мышц.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Трапециевидная мышца"
          id="Trapezmuskel"
          :dark="$store.getters.darkmode"
        >
          расположен в верхней, центральной части спины и шеи и способствует
          формированию "бычьей шее".
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Трицепс"
          id="Trizeps"
          :dark="$store.getters.darkmode"
        >
          является аналогом бицепса и располагается на задней поверхности плеча.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Передняя пилообразная мышца"
          id="Vorderer Sägemuskel"
          :dark="$store.getters.darkmode"
        >
          liegt seitlich unterhalb der Brust. Unter anderem ist der Muskel auch
          als Boxer-Muskel bekannt. Bei diesen Sportlern ist er ständig im
          Einsatz und deshalb auch besonders ausgeprägt.
        </tc-card>
      </masonry>

      <h2>Нижняя часть тела</h2>
      Если ваши проблемные зоны находятся ниже пупка, то вам необходимо знать
      эти группы мышц.
      <br />
      <br />
      <masonry :cols="{ default: 2, 600: 1 }" gutter="20px">
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Приводящие мышцы"
          id="Adduktor"
          :dark="$store.getters.darkmode"
        >
          ist die Innenseite deiner Oberschenkel. Bei Frauen sammeln sich die
          meisten Naschereien hier an.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Отводящая мышца"
          id="Abduktor"
          :dark="$store.getters.darkmode"
        >
          это наружные боковые мышцы живота и ног.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Подколенные сухожилия"
          id="Beinbeuger"
          :dark="$store.getters.darkmode"
        >
          важно для задней части бедер. Мы рекомендуем тренировки со
          скручиванием ног, особенно тем женщинам, которые хотят бороться с
          целлюлитом на бедрах и ягодицах.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Ягодичная мышца"
          id="Gluteus Maximus"
          :dark="$store.getters.darkmode"
        >
          Проще говоря, ягодичная мышца. Важная цель тренировок для всех, кто
          хочет иметь упругие ягодицы... или для тех, кто уже не влезает в свои
          любимые джинсы.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Разгибатели спины"
          id="Unterer Rücken (Rückenstrecker)"
          :dark="$store.getters.darkmode"
        >
          Это особенно важно для людей, которые в силу своей работы мало
          двигаются и поэтому страдают от болей в спине. Целенаправленная
          тренировка нижней части спины укрепляет мышцы и тем самым
          предотвращает боль.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Корпус"
          id="Rumpf"
          :dark="$store.getters.darkmode"
        >
          включает в себя грудную клетку, живот, спину и таз, а его самая узкая
          часть - талия. Это упражнение укрепляет центральную часть тела и
          предотвращает боли в спине.
        </tc-card>
        <tc-card
          :rounded="true"
          :shadow="false"
          title="Квадрицепс"
          id="Quadrizeps"
          :dark="$store.getters.darkmode"
        >
          расположен на передней поверхности бедра.
        </tc-card>
      </masonry>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MuscleGuide extends Vue {}
</script>

<style lang="scss" scoped>
.view-muscle-guide {
  .tc-card {
    margin-bottom: 20px;
  }
}
</style>
