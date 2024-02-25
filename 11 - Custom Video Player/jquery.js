const player = $(".player");
const video = $(".player .viewer");
const progress = $(".player .progress");
const progressBar = $(".player .progress__filled");
const toggle = $(".player .toggle");
const skipButtons = $("button[data-skip]");
const ranges = $(".player .player__slider");
console.log(player, progress);

function togglePlay() {
  if (video[0].paused) {
    video[0].play();
  } else {
    video[0].pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  console.log(this.paused);
  toggle.text(icon);
}

function handleProgress() {
  const percent = (video[0].currentTime / video[0].duration) * 100;
  console.log(percent);
  progressBar.css({ flexBasis: `${percent}%` });
}

function skip(e) {
  console.log(this.dataset.skip);
  video[0].currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[0][this.name] = this.value;
}

function scrub(e) {
  console.log(e.offsetX);
  const scrubTime = (e.offsetX / progress[0].offsetWidth) * video[0].duration;
  console.log(scrubTime);
  video[0].currentTime = scrubTime;
}

video.on("click", togglePlay);
toggle.on("click", togglePlay);
video.on("play", updateButton);
video.on("pause", updateButton);
video.on("timeupdate", handleProgress);

skipButtons.each(function () {
  $(this).on("click", skip);
  console.log(this);
});

ranges.each(function () {
  $(this).on("change", handleRangeUpdate);
});

let mousedown = false;
progress.on("click", scrub);
progress.on("mousemove", (e) => {
  if (mousedown) {
    scrub(e);
  }
});

progress.on("mousedown", () => {
  mousedown = true;
});
progress.on("mouseup", () => {
  mousedown = false;
});
