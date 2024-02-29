window.addEventListener("load", () => {
	let cursor=document.querySelector(".mouse_cursor");

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
	

	document.body.addEventListener("mousemove", function(e){
		gsap.to(cursor, {left: e.pageX-5, top: e.pageY-5, duration: 0.2})
	});

	const trigger=new ScrollTrigger.default({
		trigger: { //  추가 클래스와 반응 위치
				once: true,
				offset: {
					viewport: {
						x: 0,
						y: 0.25 // 윈도우 3/4 지점에서 발생
					}
				},
				toggle: {
					class: {
						in: "active",
						out: "inactive"
					}
				},
			},
		scroll: { // 페이지 번호를 JavaScript로 받기 위한 
					callback: offset => scrollInteraction(offset.y)
				}
		});
	
	trigger.add("section, footer");

	let n=0;
	
	function scrollInteraction(t){
		if(t<pageList[1].offsetTop){
			n=0;
		}
		else if (t < pageList[2].offsetTop){
			n=1;
		}
		else if (t < pageList[3].offsetTop){
			n=2;
		}
		else if (t < pageList[4].offsetTop){
			n=3;
			if( window.innerHeight+t === document.body.scrollHeight){
				n=4;
			}
		}
		else {
			n=4;
		}

		for(let i=0; i<navLi.length; i++){
			if(i===n){
				if(!navLi[i].firstElementChild.classList.contains("active")){
					navLi[i].firstElementChild.classList.add("active");
				}
			}
			else{
				if(navLi[i].firstElementChild.classList.contains("active")){
					navLi[i].firstElementChild.classList.remove("active");
				}
			}
		}
		
	}
	
	for(let i=0; i<navLi.length; i++){
		navLi[i].addEventListener("click", function(e){
			e.preventDefault();
			targety=pageList[i].offsetTop;
			gsap.to(window, {scrollTo: targety, duration: 0.5});
		});
	}
	

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

	function cursorDisplay(){
	if (device === "mobile"){
		if(!document.body.classList.contains("mobile")){
		cursor.style.display="none";
		this.document.body.classList.add("mobile");
		}
	}
	else{
		if(document.body.classList.contains("mobile")){
		cursor.style.display="block";
		this.document.body.classList.remove("mobile");
		}
	}
}

	
	marqueeSize();
	cursorDisplay();
	
	window.addEventListener("resize", function(){
		marqueeSize();
		cursorDisplay();
	});

	
	let projectLink=marqueeTop.parentElement;

	projectLink.addEventListener("mouseenter", function(){
		cursor.classList.add("active");
	});
	projectLink.addEventListener("mouseleave", function(){
		cursor.classList.remove("active");
	});
});