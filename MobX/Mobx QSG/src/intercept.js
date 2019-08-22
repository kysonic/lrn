import { intercept, observe, observable } from 'mobx';

const theme = observable({
    color: 'light',
    shades: [],
});

const disposer = intercept(theme, 'color', change => {
    console.log('Intercepting:', change);

    // Cannot unset value, so discard this change
    if (!change.newValue) {
        return null;
    }

    // Handle shorthand values
    const newTheme = change.newValue.toLowerCase();
    if (newTheme === 'l' || newTheme === 'd') {
        change.newValue = newTheme === 'l' ? 'light' : 'dark';
        return change;
    }

    // check for a valid theme
    const allowedThemes = ['light', 'dark'];
    const isAllowed = allowedThemes.includes(newTheme);
    if (!isAllowed) {
        throw new Error(`${change.newValue} is not a valid theme`);
    }

    return change; // Correct value so return as-is
});

// Immediate notifications with observe # use autorun instead

const disposer2 = observe(theme, 'color', change => {
    console.log(
        `Observing ${change.type}`,
        change.oldValue,
        '-->',
        change.newValue,
        'on',
        change.object,
    );
});

theme.color = 'dark';
