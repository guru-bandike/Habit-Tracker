import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
  },
});

// Middleware to capitalize the first letter of the habit name before saving
habitSchema.path('name').set((name) => {
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return name;
});

// Pre-save hook to set the emoji based on the habit name
habitSchema.pre('save', function (next) {
  const habit = this;

  // Ensure habit is newly created
  if (habit.isNew) {
    const wordsOfHabit = habit.name.toLowerCase().split(' ');

    // Iterate over the emojiMap to find a matching emoji
    wordsOfHabit.map((wordOfHabit) => {
      for (const { keywords, emoji } of emojiMap) {
        // If a keyword matches, set the emoji and break out of the loop
        if (keywords.includes(wordOfHabit)) {
          habit.emoji = emoji;
          break;
        }
      }
    });

    // If no matching emoji is found, set a default emoji
    if (!habit.emoji) {
      habit.emoji = '✨';
    }
  }

  // Continue with the save operation
  next();
});

// Create and export the Habit model
const HabitModel = mongoose.model('Habit', habitSchema);
export default HabitModel;

// Define emoji mappings based on habit keywords
const emojiMap = [
  { keywords: 'exercise fitness strength', emoji: '💪' },
  { keywords: 'running jogging marathon distance', emoji: '🏃‍♂️' },
  { keywords: 'yoga stretching flexibility', emoji: '🧘‍♀️' },
  { keywords: 'weightlifting gym training', emoji: '🏋️‍♂️' },
  { keywords: 'sleep rest recovery health', emoji: '😴' },
  { keywords: 'reading literature books knowledge', emoji: '📚' },
  { keywords: 'meditation calm mindfulness innerpeace', emoji: '🧘‍♂️' },
  { keywords: 'walking steps freshair outdoors', emoji: '🚶‍♂️' },
  { keywords: 'cycling biking adventure pedal', emoji: '🚴‍♂️' },
  { keywords: 'swimming laps waterexercise fitness', emoji: '🏊‍♂️' },
  { keywords: 'hiking nature trail adventure', emoji: '🥾' },
  { keywords: 'cooking meals culinary preparation', emoji: '🍳' },
  { keywords: 'nutrition balanced healthy eating', emoji: '🥗' },
  { keywords: 'hydration wellness drinking water', emoji: '💧' },
  { keywords: 'productivity efficiency work goals', emoji: '📈' },
  { keywords: 'journaling diary reflection thoughts', emoji: '📓' },
  { keywords: 'planning organization schedule calendar', emoji: '🗓️' },
  { keywords: 'creativity art painting drawing', emoji: '🎨' },
  { keywords: 'music playing instrument melody', emoji: '🎸' },
  { keywords: 'gardening plants growth nurture', emoji: '🌱' },
  { keywords: 'cleaning organization chores tidy', emoji: '🧹' },
  { keywords: 'studying homework education school', emoji: '📚' },
  { keywords: 'learning knowledge growth education', emoji: '🎓' },
  { keywords: 'relaxation spa leisure unwind', emoji: '🛁' },
  { keywords: 'mindfulness serenity peace awareness', emoji: '🧘' },
  { keywords: 'socializing friends bonding connection', emoji: '👥' },
  { keywords: 'relationships love romance affection', emoji: '❤️' },
  { keywords: 'family togetherness bonding unity', emoji: '👨‍👩‍👧‍👦' },
  { keywords: 'nature outdoors environment freshair', emoji: '🌳' },
  { keywords: 'travel exploration adventure discovery', emoji: '✈️' },
  { keywords: 'volunteering community helping support', emoji: '🤲' },
  { keywords: 'charity donations assistance support', emoji: '🎗️' },
  { keywords: 'pets animals care affection', emoji: '🐕' },
  { keywords: 'fashion style clothing trends', emoji: '👗' },
  { keywords: 'selfcare grooming maintenance wellness', emoji: '🧖‍♀️' },
  { keywords: 'medication treatment recovery health', emoji: '💊' },
  { keywords: 'shopping groceries supplies essentials', emoji: '🛒' },
  { keywords: 'budgeting management finances savings', emoji: '💵' },
  { keywords: 'investing market growth stocks', emoji: '📈' },
  { keywords: 'cryptocurrency investment blockchain trade', emoji: '🪙' },
  { keywords: 'real estate housing investment property', emoji: '🏠' },
  { keywords: 'technology gadgets innovation devices', emoji: '💻' },
  { keywords: 'photography images capturing pictures', emoji: '📷' },
  { keywords: 'videography movies filming creation', emoji: '🎥' },
  { keywords: 'gaming entertainment competition esports', emoji: '🎮' },
  { keywords: 'soccer football team sport', emoji: '⚽' },
  { keywords: 'basketball game hoops dribble', emoji: '🏀' },
  { keywords: 'tennis serve volley match', emoji: '🎾' },
  { keywords: 'golf swing putt game', emoji: '⛳' },
  { keywords: 'skating tricks ice rink', emoji: '⛸️' },
  { keywords: 'skiing snow winter', emoji: '🎿' },
  { keywords: 'climbing mountaineering adventure ascent', emoji: '🧗‍♂️' },
  { keywords: 'surfing waves ocean sport', emoji: '🏄‍♂️' },
  { keywords: 'fishing hobby catch angling', emoji: '🎣' },
  { keywords: 'camping tent outdoors adventure', emoji: '🏕️' },
  { keywords: 'sailing navigation boat water', emoji: '⛵' },
  { keywords: 'karate discipline martial arts', emoji: '🥋' },
  { keywords: 'boxing match ring fighting', emoji: '🥊' },
  { keywords: 'dancing rhythm performance movement', emoji: '💃' },
  { keywords: 'archery target bow precision', emoji: '🏹' },
  { keywords: 'chess strategy board game', emoji: '♟️' },
  { keywords: 'puzzles challenge brain teaser', emoji: '🧩' },
  { keywords: 'building construction tools repair', emoji: '🛠️' },
  { keywords: 'repair maintenance fixing upgrades', emoji: '🔧' },
  { keywords: 'home improvement renovation decor', emoji: '🏡' },
  { keywords: 'driving commute travel car', emoji: '🚗' },
  { keywords: 'motorcycling ride speed', emoji: '🏍️' },
  { keywords: 'skateboarding stunts tricks', emoji: '🛹' },
  { keywords: 'snowboarding winter sport', emoji: '🏂' },
  { keywords: 'rollerblading fun inline skating', emoji: '🛼' },
  { keywords: 'bowling strikes game', emoji: '🎳' },
  { keywords: 'pingpong sport paddle ball', emoji: '🏓' },
  { keywords: 'badminton shuttlecock net', emoji: '🏸' },
  { keywords: 'cricket sport bat game', emoji: '🏏' },
  { keywords: 'rugby game tackle scrum', emoji: '🏉' },
  { keywords: 'baseball homerun hitting sport', emoji: '⚾' },
  { keywords: 'volleyball game spike serve', emoji: '🏐' },
  { keywords: 'hockey stick puck sport', emoji: '🏒' },
  { keywords: 'lacrosse sport stick goal', emoji: '🥍' },
  { keywords: 'horse riding equestrian sport', emoji: '🏇' },
  { keywords: 'scuba diving underwater exploration', emoji: '🤿' },
  { keywords: 'paragliding sky adventure glide', emoji: '🪂' },
  { keywords: 'trampoline bounce jump fun', emoji: '🤸‍♂️' },
  { keywords: 'parkour stunts freerunning vault', emoji: '🤸' },
  { keywords: 'windsurfing board sail water', emoji: '🏄‍♂️' },
  { keywords: 'kayaking paddling river adventure', emoji: '🛶' },
  { keywords: 'canoeing rowing river sport', emoji: '🛶' },
  { keywords: 'rowing boat crew sport', emoji: '🚣‍♂️' },
  { keywords: 'zumba aerobic fitness dance', emoji: '💃' },
  { keywords: 'aerobics cardio fitness', emoji: '🧘‍♀️' },
  { keywords: 'mma fighting cage match', emoji: '🥋' },
  { keywords: 'muaythai martial arts kick', emoji: '🥋' },
  { keywords: 'kickboxing strike punch', emoji: '🥋' },
  { keywords: 'mountain biking trails offroad', emoji: '🚵‍♂️' },
  { keywords: 'bike adventure touring cycling', emoji: '🚴‍♂️' },
  { keywords: 'marathon race run jump', emoji: '🏃‍♀️' },
  { keywords: 'diet nutrition eating', emoji: '🍎' },
  { keywords: 'calories intake tracking', emoji: '🔢' },
];
