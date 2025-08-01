export type LogicOperator =
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'less_than'
  | 'contains'
  | 'not_contains'
  | 'is_empty'
  | 'is_not_empty'
  | 'includes';

export type LogicCondition = {
  id: string;
  field: string;
  operator: LogicOperator;
  value?: any;
};

export type LogicConditionGroup = {
  id: string;
  logic: 'AND' | 'OR';
  conditions: Array<LogicCondition | LogicConditionGroup>;
};

export type LogicActionType =
  | 'show'
  | 'hide'
  | 'enable'
  | 'disable'
  | 'set_value'
  | 'show_message';

export type LogicAction = {
  id: string;
  type: LogicActionType;
  target?: string;
  value?: any;
};

export type LogicActionCondition = {
  id: string;
  condition: LogicConditionGroup;
  action: LogicAction;
};

export type FormLogic = LogicActionCondition[];

export type LogicRule = {
  id: string;
  name: string;
  enabled: boolean;
  conditions: LogicConditionGroup;
  actions: LogicAction[];
};
