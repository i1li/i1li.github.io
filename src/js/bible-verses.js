if (!isMobile) {
const constructVerseURL = (ref) => {
  const lastSpace = ref.lastIndexOf(' ');
  const bookPart = lastSpace > -1 ? ref.slice(0, lastSpace).trim() : ref.trim();
  const chapterVerse = lastSpace > -1 ? ref.slice(lastSpace + 1) : '';
  const [chapter, verse_range] = chapterVerse.split(':');
  const formatted_book = bookPart.replace(/\s+/g, '').toLowerCase().substring(0, 3);
  return `https://blb.org/csb/${formatted_book}/${chapter}/${verse_range}`;
};
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
  displayRandomBibleVerse();
});
const bibleVerses = [

["Psalm 119:105",
"Your word is a lamp for my feet and a light on my path."],
["Romans 8:38-39",
"For I am persuaded that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor any other created thing will be able to separate us from the love of God that is in Christ Jesus our Lord."],
["Ephesians 6:10-11",
"Finally, be strengthened by the Lord and by his vast strength. Put on the full armor of God so that you can stand against the schemes of the devil."],
["Matthew 5:14-16",
"You are the light of the world. A city situated on a hill cannot be hidden. No one lights a lamp and puts it under a basket, but rather on a lampstand, and it gives light for all who are in the house. In the same way, let your light shine before others, so that they may see your good works and give glory to your Father in heaven."],
["1 John 4:8",
"The one who does not love does not know God, because God is love."],
["Psalm 37:4",
"Take delight in the Lord, and he will give you your heart's desires."],
["Colossians 3:23",
"Whatever you do, do it from the heart, as something done for the Lord and not for people."],
["Isaiah 40:31",
"but those who trust in the Lord will renew their strength; they will soar on wings like eagles; they will run and not become weary, they will walk and not faint."],
["Matthew 22:37-39",
"He said to him, 'Love the Lord your God with all your heart, with all your soul, and with all your mind. This is the greatest and most important command. The second is like it: Love your neighbor as yourself.'"],
["Psalm 23:4",
"Even when I go through the darkest valley, I fear no danger, for you are with me; your rod and your staff—they comfort me."],
["1 Corinthians 13:4-7",
"Love is patient, love is kind. Love does not envy, is not boastful, is not arrogant, is not rude, is not self-seeking, is not irritable, and does not keep a record of wrongs. Love finds no joy in unrighteousness but rejoices in the truth. It bears all things, believes all things, hopes all things, endures all things."],
["James 1:2-4",
"Consider it a great joy, my brothers and sisters, whenever you experience various trials, because you know that the testing of your faith produces endurance. And let endurance have its full effect, so that you may be mature and complete, lacking nothing."],
["Psalm 46:1",
"God is our refuge and strength, a helper who is always found in times of trouble."],
["Romans 5:8",
"But God proves his own love for us in that while we were still sinners, Christ died for us."],
["Proverbs 18:10",
"The name of the Lord is a strong tower; the righteous run to it and are protected."],
["Hebrews 11:1",
"Now faith is the reality of what is hoped for, the proof of what is not seen."],
["Psalm 27:1",
"The Lord is my light and my salvation—whom should I fear? The Lord is the stronghold of my life—whom should I dread?"],
["John 10:11",
"I am the good shepherd. The good shepherd lays down his life for the sheep."],
["Hebrews 13:8",
"Jesus Christ is the same yesterday, today, and forever."],
["Isaiah 41:10",
"Do not fear, for I am with you; do not be afraid, for I am your God. I will strengthen you; I will help you; I will hold on to you with my righteous right hand."],
["Jeremiah 29:11",
"For I know the plans I have for you—this is the Lord's declaration—plans for your well-being, not for disaster, to give you a future and a hope."],
["Romans 8:28",
"We know that all things work together for the good of those who love God, who are called according to his purpose."],
["Ephesians 2:8-9",
"For you are saved by grace through faith, and this is not from yourselves; it is God's gift— not from works, so that no one can boast."],
["Philippians 4:13",
"I am able to do all things through Him who strengthens me."],
["Psalm 46:10",
"Stop your fighting, and know that I am God, exalted among the nations, exalted on the earth."],
["Matthew 28:20",
"teaching them to observe everything I have commanded you. And remember, I am with you always, to the end of the age."],
["1 Corinthians 10:13",
"No temptation has overtaken you except what is common to humanity. God is faithful and He will not allow you to be tempted beyond what you are able, but with the temptation He will also provide a way of escape, so that you are able to bear it."],
["Psalm 23:1",
"The Lord is my shepherd; I have what I need."],
["Isaiah 9:6",
"For a child will be born for us, a son will be given to us, and the government will be on his shoulders. He will be named Wonderful Counselor, Mighty God, Eternal Father, Prince of Peace."],
["Matthew 11:28-30",
"Come to me, all of you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, because I am lowly and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light."],
["James 1:5",
"Now if any of you lacks wisdom, he should ask God, who gives to all generously and without criticizing, and it will be given to him."],
["1 Peter 5:7",
"casting all your cares on him, because he cares about you."],
["Joshua 1:9",
"Haven't I commanded you: be strong and courageous? Do not be afraid or discouraged, for the Lord your God is with you wherever you go."],
["Deuteronomy 31:6",
"Be strong and courageous; don't be terrified or afraid of them. For it is the Lord your God who goes with you; He will not leave you or forsake you."],
["Philippians 4:7",
"And the peace of God, which surpasses all understanding, will guard your hearts and minds in Christ Jesus."],
["Exodus 3:14",
"God replied to Moses, 'I AM WHO I AM. This is what you are to say to the Israelites: I AM has sent me to you.'"],
["John 6:35",
"I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty."],
["John 8:12",
"I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life."],
["John 10:9",
"I am the gate; whoever enters through me will be saved."],
["John 11:25-26",
"I am the resurrection and the life. The one who believes in me will live, even though they die; and whoever lives by believing in me will never die."],
["John 14:6",
"I am the way and the truth and the life. No one comes to the Father except through me."],
["John 15:1",
"I am the true vine, and my Father is the gardener."],
["John 8:58",
"Truly, truly, I say to you, before Abraham was, I am."],
["Revelation 1:8",
"I am the Alpha and the Omega, says the Lord God, who is, and who was, and who is to come, the Almighty."],
["Proverbs 3:5-6",
"Trust in the Lord with all your heart, and do not rely on your own understanding; in all your ways know him, and he will make your paths straight."],
["2 Corinthians 5:17",
"Therefore, if anyone is in Christ, he is a new creation; the old has passed away, and see, the new has come!"],
["Matthew 6:24",
"No one can serve two masters,  since either he will hate one and love the other, or he will be devoted to one and despise the other. You cannot serve both God and money."],
["2 Timothy 1:7",
"For God has not given us a spirit of fear, but of power and of love and of a sound mind."],
["Romans 12:2",
"Do not be conformed to this age, but be transformed by the renewing of your mind, so that you may discern what is the good, pleasing, and perfect will of God."],
["Proverbs 9:8-9",
"Do not rebuke mockers or they will hate you; rebuke the wise and they will love you. Instruct the wise and they will be wiser still; teach the righteous and they will add to their learning."],
["Galatians 2:20",
"I have been crucified with Christ, and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me."]

];

}
