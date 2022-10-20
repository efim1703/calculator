<template>
  <div class="calculate">
    <h1 class="calculate__title">
      Рассчитайте стоимость автомобиля в лизинг
    </h1>

    <div class="calculate__form">
      <div class="calculate__form-inputs">
        <input-range 
          :inputSettings="{
            value: commonValue.costCar,
            label: 'Cтоимость автомобиля',
            append: '₽',
            name: 'costCar'
          }"
          :slider="{
            min: 1000000,
            max: 6000000
          }"
          @change-value="setNewValue($event)"
        />
        <input-range 
          :inputSettings="{
            value: initialPayment,
            label: 'Первоначальный взнос',
            name: 'initialPayment'
          }"
          :percent="initialPaymentPercent"
          :slider="{
            min: 10,
            max: 60
          }"
          @change-value="setNewValue($event)"
          @change-percent="setNewPercent($event)"
        />

        <input-range 
          :inputSettings="{
            value: commonValue.numberMonths,
            label: 'Срок лизинга',
            append: 'мес.',
            name: 'numberMonths'
          }"
          :slider="{
            min: 1,
            max: 60
          }"
          @change-value="setNewValue($event)"
        />
      </div>

      <div class="calculate__form-calculations">
        <div class="total">
          <div class="total-label">
            Сумма договора лизинга
          </div>
          <div class="total-value">
            {{contractSum.toLocaleString()}}<span>&nbsp;₽</span>
          </div>
        </div>

        <div class="total">
          <div class="total-label">
            Ежемесячный платёж от
          </div>
          <div class="total-value">
            {{monthlyPayment.toLocaleString()}}<span>&nbsp;₽</span>
          </div>
        </div>

        <v-btn 
          color="primary" 
          class="submit"
          min-height="68px"
          min-width="320px"
          @click="submitDate()"
        >
          Оставить заявку
        </v-btn>
      </div>

      
    </div>
  </div>
</template>

<script>
import InputRange from './InputRange'


export default {
  name: 'TheCalculate',
  components: {
    InputRange
  },
  data() {
    return {
      commonValue: {
        costCar: 3300000,
        numberMonths: 60
      },
      initialPaymentPercent: 13,

    }
  },
  computed: {
    initialPayment() {
      return Math.round(this.commonValue.costCar * (this.initialPaymentPercent / 100))
    },
    monthlyPayment() {
      return Math.round((this.commonValue.costCar - this.initialPayment) * ((0.035 * Math.pow((1 + 0.035), this.commonValue.numberMonths)) / (Math.pow((1 + 0.035), this.commonValue.numberMonths) - 1)))
    },
    contractSum() {
      return Math.round(this.initialPayment + this.commonValue.numberMonths * this.monthlyPayment)
    }
  },
  methods: {
    setNewValue(newValueByInput) {

      if(newValueByInput.name === 'initialPayment') {
        this.initialPaymentPercent = +newValueByInput.value
      } else {
        this.commonValue[newValueByInput.name] = newValueByInput.value
      }
    },
    async submitDate() {
      let date = {
        "car_coast": this.commonValue.costCar,
        "initail_payment": this.initialPayment,
        "initail_payment_percent": this.initialPaymentPercent,
        "lease_term": this.commonValue.numberMonths,
        "total_sum": this.contractSum,
        "monthly_payment_from": this.monthlyPayment
      }

      console.log(date);

      await fetch('/article/fetch/post/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(date)
      });
    }
  }
  
}
</script>

