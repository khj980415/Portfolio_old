window.addEventListener("load", () => {
	let marqueeTop=document.querySelector("#sec4 .title_area .top");
	let marqueeTopText=marqueeTop.firstElementChild;
	

	let marqueeTopClone=marqueeTopText.cloneNode(true);
	marqueeTop.appendChild(marqueeTopClone);

	let marqueeBottom=document.querySelector("#sec4 .title_area .bottom");
	let marqueeBottomText=marqueeBottom.firstElementChild;
	
	let marqueeBottomClone=marqueeBottomText.cloneNode(true);
	marqueeBottom.appendChild(marqueeBottomClone);

	let winW=0;
	let device, flagState, tween1, tween2;

	function marqueeSize(){
		winW=window.innerWidth;
		if(winW>760){
			device="pc";
		}
		else{
			device="mobile";
		}
		if(flagState !== device){
			flagState=device;
			tween1=gsap.fromTo(marqueeTop, {x:0},{
				x: -1*marqueeTopText.clientWidth,
				ease: Linear.easeNone,duration: 10,
				onComplete: () => {
					tween1.restart();
				}});

			tween2=gsap.fromTo(marqueeBottom, {x:0},{
				x: 1*marqueeTopText.clientWidth,
				ease: Linear.easeNone,duration: 10,
				onComplete: () => {
					tween2.restart();
				}});
			
		}
	}

	marqueeSize();
	window.addEventListener("resize", marqueeSize);

	let cursor=document.querySelector(".mouse_cursor");

	document.body.addEventListener("mousemove", function(e){
		gsap.to(cursor, {left: e.pageX-5, top: e.pageY-5, duration: 0.2})
	});

	let projectLink=marqueeTop.parentElement;

	projectLink.addEventListener("mouseenter", function(){
		cursor.classList.add("active");
	});
	projectLink.addEventListener("mouseleave", function(){
		cursor.classList.remove("active");
	});

	let header=document.getElementById("header");
	let nav=header.lastElementChild;
	let navLi=nav.firstElementChild.children;
	let pageList=[];
	let section=document.querySelectorAll("section");
	let footer=document.getElementById("footer");
	let targety=0;

	for(let i=0; i<section.length; i++){
		pageList.push(section[i]);
	}
	pageList.push(footer);
	
	for(let i=0; i<navLi.length; i++){
		navLi[i].addEventListener("click", function(e){
			e.preventDefault();
			targety=pageList[i].offsetTop;
			gsap.to(window, {scrollTo: targety, duration: 0.5});
		});
	}
});