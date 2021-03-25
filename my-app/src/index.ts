import { Action, Context, LineContext, withProps } from "bottender";
import { router, route, text } from "bottender/router";

type LineAction = Promise<Action<LineContext> | void>;

const SayHi = async (context: LineContext): LineAction => {
  await context.sendText("Hi!");
};

const SayHiWithName = async (context: LineContext, props: any): LineAction => {
  await context.sendText(`Hi, ${props.name}`);
};

const Echo = async (context: LineContext): LineAction => {
  if (context.event.isText) {
    await context.sendText(context.event.text);
  }
};

const EventCount = async (context: LineContext): LineAction => {
  const count: number = Number(context.state.count) + 1;
  context.setState({
    count,
  });
  await context.sendText(`Count: ${count}`);
};

const Unknown = async (context: LineContext): LineAction => {
  await context.sendText("Sorry.");
};

const App = async (context: LineContext): LineAction => {
  return router([
    text(/^(hi|hello)$/i, SayHi),
    text("count", EventCount),
    route("*", Unknown),
  ]);
};

export default App;
