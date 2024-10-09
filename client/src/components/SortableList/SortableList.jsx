import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";

import {
	SortableContext,
	sortableKeyboardCoordinates,
	rectSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";

function SortableList(props) {
	const { items, setItems, children, autoScroll = true, pressDelay } = props;

	const activationConstraint = {
		delay: pressDelay || null,
	};

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint }),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	function onDragEnd({ active, over }) {
		if (active.id === over.id) {
			return;
		}
		let activeItemIndex;
		let overItemIndex;
		let updatedItems = [];
		items.forEach((item, i) => {
			updatedItems.push(item);
			if (item.id === active.id) {
				activeItemIndex = i;
			} else if (item.id === over.id) {
				overItemIndex = i;
			}
		});
		updatedItems = arrayMove(updatedItems, activeItemIndex, overItemIndex);
		updatedItems.forEach((item, i) => {
			item.order = i;
		});
		setItems(updatedItems);
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={onDragEnd}
			autoScroll={autoScroll}
		>
			<SortableContext
				strategy={rectSortingStrategy}
				items={items.map((item) => item.id)}
			>
				{children}
			</SortableContext>
		</DndContext>
	);
}

export default SortableList;
