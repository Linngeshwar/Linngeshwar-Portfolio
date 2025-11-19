export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const number = searchParams.get("number") || "30";

  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${number}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch words from API");
    }

    const data = await response.json();

    return Response.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error fetching words:", error);

    // Return fallback words if API fails
    const fallbackWords = [
      "the",
      "quick",
      "brown",
      "fox",
      "jumps",
      "over",
      "lazy",
      "dog",
      "pack",
      "my",
      "box",
      "with",
      "five",
      "dozen",
      "liquor",
      "jugs",
      "sphinx",
      "quartz",
      "judge",
      "vow",
      "rhythm",
      "fizz",
      "quiz",
      "blitz",
      "waltz",
      "glyph",
      "nymph",
      "crypt",
      "dwarf",
      "psalm",
    ];

    return Response.json(fallbackWords.slice(0, parseInt(number)), {
      status: 200,
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  }
}
