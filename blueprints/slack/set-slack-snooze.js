// Set API base URL
const apiURL = "https://slack.com/api/";

// Set headers
// Get API token with → Blueprint.userAuthentification.accessToken
const headers = {
  Authorization: "Bearer " + Blueprint.userAuthentification.accessToken,
  "Content-Type": "application/json;charset=UTF-8",
};

// Set status_text input
let durationMin = Blueprint.newInput(
  "duration_min",
  "Duration (Minutes)",
  "text"
);

Blueprint.onExecution = async function () {
  const minutes = Number(durationMin.getValue() || 0);

  try {
    // POST https://slack.com/api/dnd.setSnooze?num_minutes=123
    const response = await UrlFetch(
      `${apiUrl}dnd.setSnooze?num_minutes=${minutes}`,
      {
        method: "post",
        headers: headers,
      }
    );
  } catch (error) {
    print(error);
  }

  // Use print() for debugging
  print(response);

  const json = JSON.parse(response);

  // Create result
  Blueprint.newResult("success", "Status Set");
};
