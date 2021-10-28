let btn = document.querySelector(".record-btn")
let btn_save = document.querySelector(".download-video")

btn.addEventListener("click", async function () {
	let stream = await navigator.mediaDevices.getDisplayMedia({
		video: true
	})

	const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
		? "video/webm; codecs=vp9"
		: "video/webm"
	let mediaRecorder = new MediaRecorder(stream, {
		mimeType: mime
	})

	// Runs when MediaRecorder delivers media data 
	// Chunks gives us "chunks" of the data while the video is being recorded
	let chunks = []
	mediaRecorder.addEventListener('dataavailable', function (e) { 
		chunks.push(e.data)
	})

	mediaRecorder.addEventListener('stop', function () {
		// Create blob which contains 
		let blob = new Blob(chunks, {
			type: chunks[0].type
		})
		let url = URL.createObjectURL(blob)

		// Display video using DOM
		let video = document.querySelector("video")
		video.src = url
		// Change backgrounnd from button sav
		btn_save.style.background = "#3b6df7";
	})

	// On click reinitialize blob and download the video
	btn_save.addEventListener("click", function () {
		let blob = new Blob(chunks, {
			type: chunks[0].type
		})
		let url = URL.createObjectURL(blob)

		let video = document.querySelector("video")
		video.src = url

		let a = document.createElement('a')
		a.href = url
		a.download = 'video.webm'
		a.click()
	})



	// We have to start the recorder manually
	mediaRecorder.start()
})

