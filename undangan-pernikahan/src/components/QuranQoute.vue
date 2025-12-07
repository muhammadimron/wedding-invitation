<template>
  <section v-aos class="quran-quote">
    <p class="taawwudh-text">أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ</p>
    <p class="arab-text">
      وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
      لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ
      فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
    </p>
    <p class="terjemahan">
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
      pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan
      merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan
      sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda
      (kebesaran Allah) bagi kaum yang berpikir."
    </p>
    <p class="sumber">— Q.S. Ar-Rum Ayat 21</p>
  </section>
</template>

<style scoped>
/* Salin semua style untuk .quran-quote, .taawwudh-text, .arab-text, .terjemahan, .sumber */
h2 {
  font-family: "Great Vibes", cursive;
  font-size: 2.5rem;
  color: #bc6c25;
  margin-bottom: 20px;
}

.quran-quote {
  padding: 30px 20px;
  background-color: var(--white);
  font-family: "Times New Roman", serif;
}

.taawwudh-text {
  font-family: "Times New Roman", serif;
  font-size: 1rem;
  margin-bottom: 10px;
  color: #bc6c25;
  direction: rtl;
  text-align: center;
}

.arab-text {
  font-family: "Times New Roman", serif;
  font-size: 1rem;
  line-height: 2;
  margin-bottom: 20px;
  color: #bc6c25;
  direction: rtl;
  text-align: center;
}

.terjemahan {
  font-size: 1rem;
  font-style: italic;
  color: #777;
  max-width: 450px;
  margin: 0 auto 15px auto;
  line-height: 1.6;
}

.sumber {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-top: 5px;
}

@media (min-width: 600px) {
  .taawwudh-text {
    font-size: 1rem;
  }
  .arab-text {
    font-size: 1.2rem;
  }
  .terjemahan {
    font-size: 1.1rem;
  }
}
</style>
