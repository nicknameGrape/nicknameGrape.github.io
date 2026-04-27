class Split_Screen {
	constructor(divP1, divP2) {
		// Get HTML head element
		let head = document.getElementsByTagName('HEAD')[0];
		// Create new link Element
		let link = document.createElement('link');
		// set the attributes for link element
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = '../2p_split_screen.css';
		// Append link element to HTML head
		head.appendChild(link);
		this.divP1 = divP1;
		this.divP2 = divP2;
	}
	swap() {
		this.divP1.appendChild(this.divP2.children[0]);
		this.divP2.appendChild(this.divP1.children[0]);
	}
}

export default Split_Screen;
