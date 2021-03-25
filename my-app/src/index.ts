import { Action, Context, LineContext, withProps } from 'bottender';
import { router, route, text } from "bottender/router";

type LineAction = (context: LineContext) => Promise<Action<LineContext> | void>

type LineActionWithProps = (context: LineContext, props: any) => Promise<Action<LineContext> | void>

const SayHi: LineAction = async (context: LineContext) => {
  await context.sendText('Hi!');
}

const SayHiWithName: LineActionWithProps = async (context: LineContext, props: any) => {
  await context.sendText(`Hi, ${props.name}`)
}

const Echo: LineAction = async (context: LineContext) => {
  if (context.event.isText) {
    await context.sendText(context.event.text);
  }
}

const EventCount: LineAction = async (context: LineContext) => {
  const count = context.state.count + 1;
  context.setState({
    count,
  });
  await context.sendText(`Count: ${count}`);
}

const Unknown: LineAction = async (context: LineContext) => {
  await context.sendText('Sorry.');
}

const App: LineAction = async (context: LineContext) => {
  return router([
    text(/^(hi|hello)$/i, SayHi),
    text('count', EventCount),
    route('*', Unknown),
  ]);
}

export default App;