/*
 * Copyright 2020 Vasiliy Vdovin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class PQLPL {

	constructor() {

		this.mhHeight = 0;
		this.map = null; // Google map element.
		this.sliders3d = [];
		this.listenItems = [];

		PQLPL.listeners();
	}

	static listeners() {

		document.addEventListener("DOMContentLoaded", function() {

			PQLPL.map = document.getElementById("map");

			document.body.id = "noLoaded";

		}, false);

		window.addEventListener("load", function() {

			document.body.id = "loaded";

			PQLPL.mhHeight = document.getElementById("main-header").clientHeight;

			PQLPL.init();

		}, false);
	}

	static daemon() {

		const top = document.body.getBoundingClientRect().top * -1

		// Dynamic height of the main-header. 
		if (top >= 0) {

			document.getElementById("main-header").style.setProperty("--height", (top <= 0 ||top <= (PQLPL.mhHeight / 2) ?  PQLPL.mhHeight - top : PQLPL.mhHeight / 2) + "px");

		} else {

			document.getElementById("main-header").style.setProperty("--height", PQLPL.mhHeight + "px");
		}

		Array.prototype.forEach.call(document.getElementsByClassName("ms"), function(ms) {

			const offset = (ms.offsetTop - top) * -1;
			const percent = 1 - Math.abs(offset / ms.clientHeight);

			if (percent >= 0) {

				ms.style.setProperty("--offset", offset + "px");
				ms.style.setProperty("--percent", (percent * 100) + "%");
				ms.style.setProperty("--p", percent);
				ms.style.setProperty("--vh", (percent * 100) + "vh");
				ms.style.setProperty("--deg", ((3.6 * Math.abs(offset / ms.clientHeight) ) * 100 ) + "deg");
			}

			if (percent >= 0.25) {

				ms.classList.add("v-25");

			} else {

				ms.classList.remove("v-25");
			}

			if (percent >= 0.50) {

				ms.classList.add("v-50");

			} else {

				ms.classList.remove("v-50");
			}

			if (percent >= 0.75) {

				ms.classList.add("v-75");

			} else {

				ms.classList.remove("v-75");
			}

		});

		Array.prototype.forEach.call(PQLPL.sliders3d, function(slider) {

			const rect = slider.getBoundingClientRect();

			const pictures = slider.getElementsByTagName("picture");

			const frames = parseInt(pictures.length);

			const frame = parseInt(frames * (rect.top / window.innerHeight));

			const index = frame < 0 ? 0 : frame >= frames ? frames - 1 : frame;

			const picture = pictures.item(index);


			if(slider.picture != null) {

				slider.picture.classList.remove("visible");
			}

			picture.classList.add("visible");

			slider.picture = picture;

		});

		Array.prototype.forEach.call(PQLPL.listenItems, function(listen) {

			if (listen.dataset.listen == "position") {

				const rect = listen.getBoundingClientRect();

				if ((rect.top - (rect.height / 2)) < (window.innerHeight / 2)) {

					listen.classList.add("center-line");

				}

				console.debug(rect.top, rect.height, window.innerHeight);
			}

		});

		requestAnimationFrame(PQLPL.daemon);
	}

	static init() {

		PQLPL.sliders3d = document.getElementsByClassName("slider-3d");
		PQLPL.listenItems = document.getElementsByClassName("listen");

		PQLPL.daemon();
	}
}

// Initialize and add the Google map.
function map() {

	const uluru = { lat: parseInt(PQLPL.map.dataset.lat), lng:  parseInt(PQLPL.map.dataset.lng) };
	
	const map = new google.maps.Map(PQLPL.map, {
		zoom: parseInt(PQLPL.map.dataset.zoom),
		center: uluru,
	});

	const marker = new google.maps.Marker({
		position: uluru,
		map: map,
	});
}

const pqlp = new PQLPL();
