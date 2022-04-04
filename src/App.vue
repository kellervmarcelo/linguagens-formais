<template>
  <div class="container mx-auto p-2">
    <h1 class="text-3xl">Trabalho de Linguagens Formais</h1>
    <form @submit.prevent class="flex gap-4 items-center justify-between mt-4">
      <!-- <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-white dark:text-gray-300" for="terminals">Terminais</label>
        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="terminals" type="text" name="terminals" v-model="terminals">
      </div>

      <div class="w-full">
        <label for="nonTerminals" class="block mb-2 text-sm font-medium text-gray-white dark:text-gray-300">Não-Terminais</label>
        <input id="nonTerminals" type="text" name="nonTerminals" v-model="nonTerminals" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>

      <div class="w-full">
        <label 
          for="productions" 
          class="block mb-2 text-sm 
          font-medium text-gray-white 
          dark:text-gray-300">
          Produções
          </label>
        <input id="productions" type="text" name="productions" v-model="productions" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      
      <div class="w-full">
        <label for="start" class="block mb-2 text-sm font-medium text-gray-white dark:text-gray-300">Start</label>
        <input id="sentence" type="text" name="sentence" v-model="sentence" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div> -->

      <div>
        <label for="countries" class="block mb-2 text-sm font-medium text-white dark:text-gray-400">Selecione o exemplo</label>
        <select v-model="selectedExemple" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="option1">Opção 1</option>
          <option value="option2">Opção 2</option>
          <option value="option3">Opção 3</option>
        </select>

        {{ selectedExempleProps }}
      </div>
    </form>

    <button class="text-white bg-gradient-to-br mt-4 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" @click="chooseProduction(sentence)">Gerar</button>


    <div class="mt-4">
     <h2 class="text-2xl">Output:</h2>
     <p>Start: {{ sentence }}</p>
     <p>Produções: {{  selectedExempleProps  }}</p>
     <p>{{ output }}</p> 
    </div>
  </div>
</template>

<script>
import { getRandomInt, isItNonTerminal } from "./utils/script.js";

export default {
  name: "App",
  data() {
    return {
      terminals: "",
      nonTerminals: "",
      productions: "",
      start: "",
      selectedExemple: "",
      sentence: ["aSbAS", "ab"],
      output: "",
      option1: {
        nonTerminalsDictionary: {
          S: "aSab | Sb ",
          A: "ab",
        },
        start: ["aSbAS", "ab"],
      },
      option2: {
        nonTerminalsDictionary: {
          S: "aSab | Sb ",
          A: "ab",
        },
        start: ["aBSa", "ab"],
      },
      option3: {
        nonTerminalsDictionary: {
          S: "aaa | Sb ",
          A: "ab",
        },
        start: ["aSbAS", "ab"],
      },
    };
  },
  computed: {
    terminalsArray() {
      return this.terminals.split(",");
    },
    selectedExempleProps() {
      return this[this.selectedExemple];
    },
  },
  created() {
    this.output = this.chooseProduction(["aSbAS", "ab"]);
  },
  methods: {
    splitString(production) {
      let productionArray = production.split("").reverse();
      let output = [];
      let dictionary = {
        A: "a",
        S: "ab | aSB",
        B: "A | b",
      };

      this.productions = dictionary;

      if (productionArray.some((item) => isItNonTerminal(item))) {
        productionArray.forEach((item, index) => {
          if (isItNonTerminal(item)) {
            productionArray = productionArray.slice(index);
            if (!dictionary[item]) {
              return;
            }

            let sentences = dictionary[item].split("|");
            let randomInt = getRandomInt(sentences.length);

            output.unshift(sentences[randomInt].trim());
          } else {
            productionArray = productionArray.slice(index);
            output.unshift(item);
          }
        });
        this.splitString(output.join(""));
      } else {
        this.output = production;
      }
    },

    chooseProduction(productions) {
      const randomInt = getRandomInt(productions.length);
      var production = productions[randomInt];

      this.splitString(production);
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #333;
  color: #fff;
}
</style>
