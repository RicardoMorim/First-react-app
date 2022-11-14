# react-poper

## description

-   A simple React Component modal popup solution.
-   Class Poper will create A global Component mount point.
-   Usually you may export a global handler like this export const pop = new Poper();
-   If css Module opened, please ignore poper.css

## usage

```shell
    yarn add react-poper
```

pop.tsx

```tsx
import React from 'react';
import { Modal, Poper, Alert, Wait, RemindProps, WaitProps } from 'react-poper';
class Remind extends Modal<RemindProps> {
    static readonly dimming = 0;
    render() {
        const { title, message } = this.props;
        return (
            <div>
                <div>{title}</div>
                <div>{message}</div>
            </div>
        );
    }
}
Alert.defaultProps.theme = 'yellow';
Wait.defaultProps.timeout = 15;
export const pop = new Poper({
    errmsg: 'System Error',
    Remind: Remind,
    dimming: 0.4,
    fadedur: 0.3,
});
```

page.tsx

```tsx
import pop from './pop';
export default () => {
    return <div onClick={() => pop.alert('this is alert')}>show alert</div>;
};
```
