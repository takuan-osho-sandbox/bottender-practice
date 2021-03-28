import { Action, Context, LineContext, withProps } from "bottender";
import { router, route, text } from "bottender/router";

type LineAction = Promise<Action<LineContext> | void>;

const sayHi = async (context: LineContext): LineAction => {
  await context.sendText("Hi!");
};

const sayHiWithName = async (context: LineContext, props: any): LineAction => {
  await context.sendText(`Hi, ${props.name}`);
};

const echo = async (context: LineContext): LineAction => {
  if (context.event.isText) {
    await context.sendText(context.event.text);
  }
};

const eventCount = async (context: LineContext): LineAction => {
  const count: number = Number(context.state.count) + 1;
  context.setState({
    count,
  });
  await context.sendText(`Count: ${count}`);
};

const unknown = async (context: LineContext): LineAction => {
  await context.sendText("Sorry.");
};

const app = async (context: LineContext): LineAction => {
  return router([
    text(/^(hi|hello)$/i, sayHi),
    text("count", eventCount),
    route("*", unknown),
  ]);
};

export default app;
