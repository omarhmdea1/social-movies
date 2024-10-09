import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DraggableItem({ id, children }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
		isOver,
	} = useSortable({ id });

	const childrenWithProps = React.Children.map(children, (child) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { isDragging, isOver });
		}
		return child;
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		touchAction: "none",
		transition,
	};

	if (isDragging) {
		style.zIndex = 999999;
	}

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{childrenWithProps}
		</div>
	);
}

export default DraggableItem;
