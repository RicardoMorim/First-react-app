import React from 'react';
export declare type AlertAction =
    | {
          readonly title: string;
          readonly block?: () => void;
      }
    | string
    | (() => void);
export interface ModalProps {
    /** dismiss callback */
    onhide?: () => void;
    /** present callback */
    onshow?: () => void;
    /** the priority of modal means z-index */
    priority?: number;
}
export interface AlertProps extends ModalProps {
    /** alert title */
    title?: string;
    /** a css color string use for alert btn etc*/
    theme?: string;
    /** cancel action */
    cancel?: AlertAction;
    /** cancel action */
    confirm?: AlertAction;
    /** alert message */
    message?: string;
    /** the priority of modal means z-index @default 1000*/
    priority?: number;
}
export interface WaitProps extends ModalProps {
    /** preset wait theme */
    theme?: 'dark' | 'light';
    /** waiting timeout @default 20s */
    timeout?: number;
    /** waiting message */
    message?: string;
    /** the priority of modal means z-index @default 1002*/
    priority?: number;
}
export interface RemindProps extends ModalProps {
    /** remind title */
    title?: string;
    /** remind message */
    message?: string;
    /** keep duration @default 1 @unit s */
    duration?: number;
    /** the priority of modal means z-index @default 1001*/
    priority?: number;
}
export interface ModalType<P extends ModalProps = ModalProps, S = React.ComponentState> extends React.ComponentClass<P, S> {
    new (props: P, context?: any): Modal<P, S>;
    /** mask can be tap or not */
    readonly masktap: boolean;
    /** only one or not */
    readonly onlyone: boolean;
    /** dimming rate */
    readonly dimming: number;
    /** fade-out mode */
    readonly fademode: 'all' | 'mask';
}
/**
 * @description base abstract for all Poper Modal
 * @notice subclass can overwride some settings
 */
export declare abstract class Modal<P extends ModalProps = ModalProps, S = React.ComponentState> extends React.Component<P, S> {
    /** allow mask tap or not @default false */
    static readonly masktap: boolean;
    /** show only one of same Modal or not @default true  */
    static readonly onlyone: boolean;
    /** dimming rate of same Modal  @default -1 */
    static readonly dimming: number;
    /** fade mode of same Modal @param all fade all content @param mask fade mask only @default all */
    static readonly fademode: 'all' | 'mask';
    /** dismiss modal itself @param finish animation finished */
    public readonly dismiss: (finish?: () => void) => void;
    /** trigger when present animation begin */
    protected modalWillShow(): void;
    /** trigger when dismiss animation begin */
    protected modalWillHide(): void;
    /** trigger when present animation finished */
    protected modalDidShow(): void;
    /** trigger when dismiss animation finished */
    protected modalDidHide(): void;
    /** trigger when mask have been taped */
    protected modalTapMask(): void;
}
export class Wait extends Modal<WaitProps> {
    static defaultProps: Partial<WaitProps>;
}
/**
 * @description default Alert Modal implement
 * @notice implement by cubic-bezier function
 * transition: all 0.25s cubic-bezier(0.76, 2.07, 0.63, 0.68);
 */
export class Alert extends Modal<AlertProps> {
    static defaultProps: Partial<AlertProps>;
}
export class Remind extends Modal<RemindProps> {
    static defaultProps: Partial<RemindProps>;
}
export interface PoperConfig {
    /** implements Component for Poper.wait @default Wait */
    readonly Wait?: ModalType<WaitProps>;
    /** implements Component for Poper.alert @default Alert */
    readonly Alert?: ModalType<AlertProps>;
    /** implements Component for Poper.remind @default Remind */
    readonly Remind?: ModalType<RemindProps>;
    /** defalut error message for unknown Error @default 'System Error' */
    readonly errmsg?: string;
    /** fade-in-out animation time-func duration  @default 0.3 @unit s*/
    readonly fadedur?: number;
    /** dimming rate for all Modal @default 0.4 */
    readonly dimming?: number;
}
/**
 * @description poper handler
 * @example
 * ```
 * import React from 'react';
 * import { Modal, Poper, AlertProps, RemindProps, WaitProps } from 'react-poper';
 * class Alert extends Modal<AlertProps> {
 *     static readonly onlyone = false;
 * }
 * class Remind extends Modal<RemindProps> {
 *     static readonly dimming = 0;
 * }
 * class Wait extends Modal<WaitProps> {
 *     static readonly dimming = 0;
 *     static readonly masktap = true;
 * }
 * export const pop = new Poper({
 *    errmsg: 'System Error',
 *    Alert: Alert,
 *    Remind: Remind,
 *    Wait: Wait,
 *    dimming: 0.4,
 * });
 * ```
 */
export declare class Poper {
    /** defalut error message for unknown Error @default 'System Error' */
    public readonly errmsg: string;
    /** fade-in-out animation time-func duration  @default 0.3 @unit s*/
    public readonly fadedur: number;
    /** dimming rate for all Modal @default 0.4 */
    public readonly dimming: number;
    /**
     * @description show a Modal Component
     * @param meta Modal Component class for modal
     * @param props Modal Component props
     */
    public readonly present: <P extends ModalProps>(meta: ModalType<P>, props?: P) => void;
    /**
     * @description dismiss some presented modal
     * @param indexOrMeta the index in modal stack or  Modal Component class if undefined means dismiss all.
     * @param finish callback when animation finished
     */
    public readonly dismiss: (indexOrMeta?: number | ModalType | undefined, finish?: (() => void) | undefined) => void;
    /**
     * @description present an auto dismiss Modal after duration
     * @warn Remind Modal Component Class must be configed
     * @param msgOrProps message of RemindProps or RemindProps
     */
    public readonly remind: (msgOrProps: string | RemindProps) => void;
    /**
     * @description present an dialog Modal with one or two selection
     * @warn Alert Modal Component Class must be configed
     * @param msgOrProps message of AlertProps or AlertProps
     */
    public readonly alert: (msgOrProps: string | AlertProps) => void;
    /**
     * @description remind error remind(error.message || config.errmsg)
     * @warn Remind Modal Component Class must be configed
     */
    public readonly error: (error?: any) => void;
    /**
     * @description presnet a loading Modal
     * @warn Wait Modal Component Class must be configed
     * @param msgOrProps message of WaitProps or WaitProps
     */
    public readonly wait: (msgOrProps?: string | WaitProps) => void;
    /** dismiss Wait modal */
    public readonly idle: () => void;
    /** designed constructor */
    constructor(config?: PoperConfig);
}
