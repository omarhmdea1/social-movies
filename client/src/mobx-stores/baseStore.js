import { action, makeObservable, observable } from "mobx";

import { CLIENT_SIDE_REQUEST_ERROR } from "../constants/errors";
import FormatUtils from "../utils/formatUtils";

class BaseStore {
	success = false;
	loading = true;
	errors = null;
	data = null;
	actionSuccess = false;
	actionLoading = false;
	actionErrors = null;
	actionData = null;

	constructor(props = {}) {
		this.UIStore = props.UIStore;
		this.showActionToast = props.showActionToast ?? true;

		makeObservable(this, {
			success: observable,
			loading: observable,
			errors: observable,
			data: observable,
			actionSuccess: observable,
			actionLoading: observable,
			actionErrors: observable,
			actionData: observable,
			setLoading: action,
			setData: action,
			setError: action,
			setActionLoading: action,
			setActionData: action,
			setActionError: action,
		});
	}

	setLoading() {
		this.loading = true;
		this.success = false;
		this.errors = null;
		this.data = null;
	}

	setData(data) {
		this.loading = false;
		this.success = true;
		this.errors = null;
		this.data = data;
	}

	setError(errors) {
		this.loading = false;
		this.success = false;
		this.errors = errors ?? CLIENT_SIDE_REQUEST_ERROR;
		this.data = null;
	}

	setActionLoading() {
		this.actionLoading = true;
		this.actionSuccess = false;
		this.actionErrors = null;
		this.actionData = null;
	}

	setActionData(data) {
		this.actionLoading = false;
		this.actionSuccess = true;
		this.actionErrors = null;
		this.actionData = data;
		if (this.showActionToast) {
			this.UIStore.closeAllToasts();
		}
	}

	setActionError(errors) {
		this.actionLoading = false;
		this.actionSuccess = false;
		this.actionErrors = errors ?? CLIENT_SIDE_REQUEST_ERROR;
		this.actionData = null;
		const globalError = FormatUtils.getGlobalError(this.actionErrors);
		if (this.showActionToast && globalError) {
			this.UIStore.openErrorToast(globalError);
		}
	}
}

export default BaseStore;
