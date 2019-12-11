import { writable } from 'svelte/store';

let uuid = 1;

function createTodos() {
    const { subscribe, set, update } = writable([
        {
            title: 'Buy milk',
            id: 0,
            done: false
        }
    ]);

    return {
        subscribe,
        add: input =>
            update(todos => {
                const title = input.value;
                if (!title) return todos;
                input.value = '';
                return [...todos, { title, id: uuid++, done: false }];
            }),
        remove: id => update(todos => todos.filter(t => t.id !== id)),
        done: (todo, done) =>
            update(todos => {
                todo.done = done;
                todos = todos.filter(t => t !== todo);
                return todos.concat(todo);
            }),
        reset: () => set([])
    };
}

export const todos = createTodos();
