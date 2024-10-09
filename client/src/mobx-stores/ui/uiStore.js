import { action, makeObservable, observable } from "mobx";

import { toast } from "react-toastify";

class UIStore {
	transparentHeader = false;
	modalConfig = {
		active: false,
		isConfirmation: false,
		onConfirm: null,
		body: null,
		freezed: false,
	};
	navigationHistory = [];
	previousPage = null;
	currentPage = null;
	isBackButtonHidden = true;

	constructor() {
		makeObservable(this, {
			transparentHeader: observable,
			modalConfig: observable,
			navigationHistory: observable,
			currentPage: observable,
			previousPage: observable,
			isBackButtonHidden: observable,
			setTransparentHeader: action,
			openModal: action,
			closeModal: action,
			freezeModal: action,
			unFreezeModal: action,
			updateNavigationHistory: action,
		});
	}

	setTransparentHeader(value) {
		this.transparentHeader = value;
	}

	openModal(modalConfig) {
		this.modalConfig.active = true;
		this.modalConfig.isConfirmation = modalConfig.isConfirmation;
		this.modalConfig.onConfirm = modalConfig.onConfirm;
		this.modalConfig.body = modalConfig.body;
	}

	closeModal() {
		if (this.modalConfig.freezed) {
			return;
		}
		this.modalConfig.active = false;
		this.modalConfig.onConfirm = null;
	}

	freezeModal() {
		this.modalConfig.freezed = true;
	}

	unFreezeModal() {
		this.modalConfig.freezed = false;
	}

	openSuccessToast(body, id) {
		return toast.success(body, { toastId: id });
	}

	openInfoToast(body, id) {
		return toast.info(body, { toastId: id });
	}

	openWarningToast(body, id) {
		return toast.warning(body, { toastId: id });
	}

	openErrorToast(body, id) {
		return toast.error(body, { toastId: id });
	}

	closeAllToasts() {
		toast.dismiss();
	}

	closeToast(id) {
		toast.dismiss(id);
	}

	updateNavigationHistory(path, type) {
		const reservedPaths = [
			"/login",
			"/register",
			"/demo",
			"/mobile-settings",
		];
		const backButtonHiddenPaths = ["/", ...reservedPaths];
		this.isBackButtonHidden = backButtonHiddenPaths.includes(path);
		if (this.navigationHistory.at(-1) === path) {
			return;
		}
		if (reservedPaths.includes(path)) {
			return;
		}
		if (type === "PUSH") {
			this.navigationHistory.push(path);
		} else {
			this.navigationHistory.pop();
		}
		this.previousPage = this.navigationHistory.at(-2) || "/";
		this.currentPage = path;
	}
}

export default UIStore;
