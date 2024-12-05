const wordBank = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
    "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
    "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
    "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
    "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
    "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
    "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
    "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
    "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
    "man", "woman", "child", "world", "life", "hand", "part", "eye", "place", "case",
    "week", "company", "system", "program", "question", "work", "government", "number", "night", "point",
    "home", "water", "room", "mother", "area", "money", "story", "fact", "month", "lot",
    "right", "study", "book", "word", "business", "issue", "side", "kind", "head", "house",
    "service", "friend", "father", "power", "hour", "game", "line", "end", "member", "law",
    "car", "city", "community", "name", "president", "team", "minute", "idea", "kid", "body",
    "information", "back", "parent", "face", "others", "level", "office", "door", "health", "person",
    "art", "war", "history", "party", "result", "change", "morning", "reason", "research", "girl"
];

export function getRandomPrompt() {
    let prompt = [];
    for (let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * wordBank.length);
        prompt.push(wordBank[randomIndex]);
    }
    return prompt.join(' ');
}