import { writable } from 'svelte/store';

function createTodos() {
    let localTodos = JSON.parse(localStorage.getItem('todos'));
    let uuid = JSON.parse(localStorage.getItem('uuid')) + 1;

    if (!localTodos) {
        localStorage.setItem('todos', '[]');
        localStorage.setItem('uuid', 0);
        uuid = 0;
        localTodos = [];
    }

    const { subscribe, update } = writable(localTodos);

    return {
        subscribe,
        add: input => {
            update(todos => {
                const title = input.value;
                if (!title) return todos;
                input.value = '';
                localStorage.setItem('uuid', uuid++);
                return [...todos, { title, id: uuid, done: false }];
            });
        },
        remove: id => update(todos => todos.filter(t => t.id !== id)),
        done: (todo, done) =>
            update(todos => {
                todo.done = done;
                todos = todos.filter(t => t !== todo);
                return todos.concat(todo);
            }),
        reset: () => {
            if (confirm('Are you sure to empty?')) update(todos => todos.filter(t => !t.done));
        }
    };
}

export const todos = createTodos();

function createNav() {
    let selectedNav = JSON.parse(localStorage.getItem('selectedNav'));

    if (!selectedNav) {
        const initialValue = { title: 'Todo', index: 0 };
        localStorage.setItem('selectedNav', JSON.stringify(initialValue));
        selectedNav = initialValue;
    }

    const { subscribe, update } = writable(selectedNav);

    return {
        subscribe,
        navigate: nav => {
            update(() => nav);
        }
    };
}

export const selectedNav = createNav();
