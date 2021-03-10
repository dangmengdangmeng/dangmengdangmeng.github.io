let curSkin = 'Assassin';
let curAction = 'walk';
let skeleton, state;
let swordStatus = false;

function changeSkin(name) {
	curSkin = name;
	skeleton.setSkinByName(curSkin);
	skeleton.setSlotsToSetupPose();
}

function changeAction(name) {
	curAction = name;
	state.setAnimation(0, curAction, true);
}

function swingSword(status) {
	if (status) {
		swordStatus = !swordStatus;
		state.setAnimation(5, swordStatus ? "meleeSwing2" : "meleeSwing1", false, 0);
	} else {
		state.setAnimation(5, "empty", false, 0);
	}
}

function randomizeAttachments() {
	var skins = [];
	for (var skin in skeleton.data.skins) {
		skin = skeleton.data.skins[skin];
		if (skin.name === "default") continue;
		skins.push(skin);
	}
	var newSkin = new spine.Skin("random-skin");
	for (var slot = 0; slot < skeleton.slots.length; slot++) {
		var skin = skins[(Math.random() * skins.length - 1) | 0];
		var attachments = skin.attachments[slot];
		for (var attachmentName in attachments) {
			newSkin.setAttachment(slot, attachmentName, attachments[attachmentName]);
		}
	}
	setSkin(newSkin);
}

//随机皮肤
function randomizeSkin() {
	let result;
	let count = 0;
	for (let skin in skeleton.data.skins) {
		if (skeleton.data.skins[skin].name === "default") continue;
		if (Math.random() < 1 / ++count) {
			result = skeleton.data.skins[skin];
		}
	}
	setSkin(result);
}

function setSkin(skin) {
	let slot = skeleton.findSlot("item_near");
	let weapon = slot.getAttachment();
	skeleton.setSkin(skin);
	skeleton.setSlotsToSetupPose();
	slot.setAttachment(weapon);
}

const skinsDemo = function (canvas, bgColor) {
	var gl, renderer, input, assetManager;
	let offset, bounds;
	let timeKeeper;

	let DEMO_NAME = "SkinsDemo";

	// if (!bgColor) bgColor = new spine.Color(255 / 255, 255 / 255, 255 / 255, 0.5)

	function init() {
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		gl = canvas.ctx.gl;

		renderer = new spine.webgl.SceneRenderer(canvas, gl);
		assetManager = spineDemos.assetManager;
		let textureLoader = function (img) {
			return new spine.webgl.GLTexture(gl, img);
		};
		assetManager.loadTexture(DEMO_NAME, textureLoader, "heroes.png");
		assetManager.loadTexture(DEMO_NAME, textureLoader, "heroes2.png");
		assetManager.loadText(DEMO_NAME, "heroes.atlas");
		assetManager.loadJson(DEMO_NAME, "heroes.json");
		input = new spine.webgl.Input(canvas);
		timeKeeper = new spine.TimeKeeper();
	}

	function loadingComplete() {
		let atlas = new spine.TextureAtlas(assetManager.get(DEMO_NAME, "heroes.atlas"), function (path) {
			return assetManager.get(DEMO_NAME, path);
		});
		let atlasLoader = new spine.AtlasAttachmentLoader(atlas);
		let skeletonJson = new spine.SkeletonJson(atlasLoader);
		let skeletonData = skeletonJson.readSkeletonData(assetManager.get(DEMO_NAME, "heroes.json"));
		skeleton = new spine.Skeleton(skeletonData);
		skeleton.setSkinByName(curSkin);
		let stateData = new spine.AnimationStateData(skeleton.data);
		stateData.defaultMix = 0.2;
		stateData.setMix("roll", "run", 0);
		stateData.setMix("jump", "run2", 0);
		state = new spine.AnimationState(stateData);
		changeAction(curAction);
		state.apply(skeleton);
		skeleton.updateWorldTransform();
		offset = new spine.Vector2();
		bounds = new spine.Vector2();
		skeleton.getBounds(offset, bounds, []);
	}

	//换肤
	function setSkin(skin) {
		let slot = skeleton.findSlot("item_near");
		let weapon = slot.getAttachment();
		skeleton.setSkin(skin);
		skeleton.setSlotsToSetupPose();
		slot.setAttachment(weapon);
	}


	//随机皮肤
	function randomizeSkin() {
		let result;
		let count = 0;
		for (let skin in skeleton.data.skins) {
			if (skeleton.data.skins[skin].name === "default") continue;
			if (Math.random() < 1 / ++count) {
				result = skeleton.data.skins[skin];
			}
		}
		setSkin(result);
	}


	function render() {
		timeKeeper.update();
		const {delta} = timeKeeper;

		// renderer.camera.position.x = offset.x + bounds.x * 1.5 - 125
		renderer.camera.position.x = offset.x + bounds.x / 2;
		renderer.camera.position.y = offset.y + bounds.y / 2;
		renderer.camera.viewportWidth = bounds.x * 3;
		renderer.camera.viewportHeight = bounds.y * 1.2;
		renderer.resize(spine.webgl.ResizeMode.Fit);

		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		state.update(delta);
		state.apply(skeleton);
		skeleton.updateWorldTransform();

		renderer.begin();
		renderer.drawSkeleton(skeleton, true);
		renderer.end();
	}

	skinsDemo.loadingComplete = loadingComplete;
	skinsDemo.render = render;
	skinsDemo.DEMO_NAME = DEMO_NAME;
	init();
};

