const bibleVerses = [
{
    verse: "Exodus 3:14",
    text: "I AM WHO I AM. This is what you are to say to the Israelites: 'I AM has sent me to you.'"
},
{
    verse: "John 6:35",
    text: "I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty."
},
{
    verse: "John 8:12",
    text: "I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life."
},
{
    verse: "John 10:9",
    text: "I am the gate; whoever enters through me will be saved."
},
{
    verse: "John 10:11",
    text: "I am the good shepherd. The good shepherd lays down his life for the sheep."
},
{
    verse: "John 11:25-26",
    text: "I am the resurrection and the life. The one who believes in me will live, even though they die; and whoever lives by believing in me will never die."
},
{
    verse: "John 14:6",
    text: "I am the way and the truth and the life. No one comes to the Father except through me."
},
{
    verse: "John 15:1",
    text: "I am the true vine, and my Father is the gardener."
},
{
    verse: "John 8:58",
    text: "Truly, truly, I say to you, before Abraham was, I am."
},
{
    verse: "Revelation 1:8",
    text: "I am the Alpha and the Omega, says the Lord God, who is, and who was, and who is to come, the Almighty."
},
{
verse: "Philippians 4:13",
text: "I can do all things through him who strengthens me."
},
{
verse: "Jeremiah 29:11",
text: "'For I know the plans I have for you' - this is the Lord's declaration - 'plans for your well-being, not for disaster, to give you a future and a hope.'"
},
{
verse: "Romans 8:28",
text: "We know that all things work together for the good of those who love God, who are called according to his purpose."
},
{
verse: "Psalm 23:1",
text: "The Lord is my shepherd; I have what I need."
},
{
verse: "Proverbs 3:5-6",
text: "Trust in the Lord with all your heart, and do not rely on your own understanding; in all your ways know him, and he will make your paths straight."
},
{
verse: "Isaiah 41:10",
text: "Do not fear, for I am with you; do not be afraid, for I am your God. I will strengthen you; I will help you; I will hold on to you with my righteous right hand."
},
{
verse: "2 Corinthians 5:17",
text: "Therefore, if anyone is in Christ, he is a new creation; the old has passed away, and see, the new has come!"
},
{
verse: "Matthew 11:28",
text: "Come to me, all of you who are weary and burdened, and I will give you rest."
},
{
verse: "Galatians 2:20",
text: "I have been crucified with Christ, and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me."
},
{
verse: "Joshua 1:9",
text: "Haven't I commanded you: be strong and courageous? Do not be afraid or discouraged, for the Lord your God is with you wherever you go."
}
];
function constructBLBUrl(verse) {
const [book, chapter_verse] = verse.split(' ');
const [chapter, verse_range] = chapter_verse.split(':');
const formatted_book = book.toLowerCase().substring(0, 3);
return `https://www.blb.org/csb/${formatted_book}/${chapter}/${verse_range}`;
}
function displayRandomBibleVerse() {
  shuffle(bibleVerses);
  let currentIndex = 0;
  let remainingTime = 0;
  let timerPause = null;
  const tickInterval = 500;
  function displayVerse() {
    const bibleVerse = bibleVerses[currentIndex];
    document.querySelectorAll('.bible-verse-text').forEach(element => {
      element.textContent = bibleVerse.text;
    });
    document.querySelectorAll('.bible-verse-link').forEach(element => {
      element.textContent = bibleVerse.verse;
      element.href = constructBLBUrl(bibleVerse.verse);
    });
    const wordCount = bibleVerse.text.split(' ').length;
    remainingTime = wordCount * 650;
    currentIndex = (currentIndex + 1) % bibleVerses.length;
    checkAndSetTimeout();
  }
  function checkAndSetTimeout() {
    if (timerPause) {
      clearTimeout(timerPause);
    }
    function tick() {
      if (isWindowActive && !document.querySelector('header').classList.contains('scrolled-down')) {
        remainingTime -= tickInterval;
        if (remainingTime <= 0) {
          displayVerse();
        } else {
          timerPause = setTimeout(tick, tickInterval);
        }
      } else {
        timerPause = setTimeout(tick, tickInterval);
      }
    }
    tick();
  }
  displayVerse();
}
