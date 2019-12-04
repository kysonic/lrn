import {types, getRoot, getSnapshot} from 'mobx-state-tree';
import {autorun} from 'mobx';

// MST Types

const User = types.model('User', {
    id: types.identifier,
    name: types.string,
    age: 42,
    twitter: types.maybe(types.refinement(types.string, v =>
        /^\w+$/.test(v))),
});

const Todo = types.model({
   title: types.string,
   done: false,
   assignee: types.maybe(types.reference(User))
})
    .actions(self => ({
        toggle() {
            self.done = !self.done;
        }
    }))
    .views(self => ({
        get asMarkdown(){
            return self.done ? `*[x]~~${self.title}~~` : `*[]~~${self.title}~~`;
        },

        contains() {
            return self.title.indexOf(text) !== -1;
        }
    }));

const todo  = Todo.create({
    title: 'Read a book',
    done: false
});

autorun(() => {
   console.log(`${todo.title} ${todo.done}`);
});

todo.toggle();


// Composing stores

const App = types.model('App', {
    todos: types.array(Todo),
    users: types.array(User)
});

const app = App.create({
    todos: [
        { title: 'Write the chapter', done: false, assignee: '37'},
        { title: 'Review the chapter', done: false, assignee: '38'}
    ],
    users: [{
        id: '37',
        name: 'Michel Westrate',
        twitter: 'mwestrate'
    }, {
        id: '38',
        name: 'Pavan Podila',
        twitter: 'pavanpodila'
    }]
});

app.todos[0].toggle();
console.log(app.todos[0].assignee);
console.log(getSnapshot(app));
