if (!isMobile) {
function constructVerseURL(verse) {
const [book, chapter_verse] = verse.split(' ');
const [chapter, verse_range] = chapter_verse.split(':');
const formatted_book = book.toLowerCase().substring(0, 3);
return `https://www.blb.org/csb/${formatted_book}/${chapter}/${verse_range}`;
}
function displayRandomBibleVerse() {
  const headerVerse = document.getElementById('header-verse');
  headerVerse.style.display = 'block';
  shuffle(bibleVerses);
  let currentIndex = 0;
  let remainingTime = 0;
  let timerPause = null;
  const tickInterval = 500;
  function displayVerse() {
    const bibleVerse = bibleVerses[currentIndex];
    document.querySelectorAll('.bible-verse-text').forEach(element => {
      element.textContent = bibleVerse[1];
    });
    document.querySelectorAll('.bible-verse-link').forEach(element => {
      element.textContent = bibleVerse[0];
      element.href = constructVerseURL(bibleVerse[0]);
    });
    const wordCount = bibleVerse[1].split(' ').length;
    remainingTime = Math.max(wordCount * 650, 3300);
    currentIndex = (currentIndex + 1) % bibleVerses.length;
    checkAndSetTimeout();
  }
  function checkAndSetTimeout() {
    if (timerPause) {
      clearTimeout(timerPause);
    }
    function tick() {
      if (isWindowActive && !document.querySelector('header').classList.contains('scrolled-down')) {
        headerVerse.style.display = 'block';
        remainingTime -= tickInterval;
        if (remainingTime <= 0) {
          displayVerse();
        } else {
          timerPause = setTimeout(tick, tickInterval);
        }
      } else {
        headerVerse.style.display = 'none';
        timerPause = setTimeout(tick, tickInterval);
      }
    }
    tick();
  }
  displayVerse();
}
document.addEventListener("DOMContentLoaded", function() {
  if (isInitialLoad) {
    displayRandomBibleVerse();
  }
});
const bibleVerses = [[
"Philippians 4:7",
"And the peace of God, which surpasses all understanding, will guard your hearts and minds in Christ Jesus."
],[
"Exodus 3:14",
"God replied to Moses, 'I AM WHO I AM. This is what you are to say to the Israelites: I AM has sent me to you.'"
],[
"John 6:35",
"I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty."
],[
"John 8:12",
"I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life."
],[
"John 10:9",
"I am the gate; whoever enters through me will be saved."
],[
"John 11:25-26",
"I am the resurrection and the life. The one who believes in me will live, even though they die; and whoever lives by believing in me will never die."
],[
"John 14:6",
"I am the way and the truth and the life. No one comes to the Father except through me."
],[
"John 15:1",
"I am the true vine, and my Father is the gardener."
],[
"John 8:58",
"Truly, truly, I say to you, before Abraham was, I am."
],[
"Revelation 1:8",
"I am the Alpha and the Omega, says the Lord God, who is, and who was, and who is to come, the Almighty."
],[
"Proverbs 3:5-6",
"Trust in the Lord with all your heart, and do not rely on your own understanding; in all your ways know him, and he will make your paths straight."
],[
"2 Corinthians 5:17",
"Therefore, if anyone is in Christ, he is a new creation; the old has passed away, and see, the new has come!"
],[
"Matthew 6:24",
"No one can serve two masters,  since either he will hate one and love the other, or he will be devoted to one and despise the other. You cannot serve both God and money."
],[
"2 Timothy 1:7",
"For God has not given us a spirit of fear, but of power and of love and of a sound mind."
],[
"Romans 12:2",
"Do not be conformed to this age, but be transformed by the renewing of your mind, so that you may discern what is the good, pleasing, and perfect will of God."
],[
"Proverbs 9:8-9",
"Do not rebuke mockers or they will hate you; rebuke the wise and they will love you. Instruct the wise and they will be wiser still; teach the righteous and they will add to their learning."
],[
"Galatians 2:20",
"I have been crucified with Christ, and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me."
]];

}
