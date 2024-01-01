import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { widget } = service;

  const { data: stats, error: statsError } = useWidgetAPI(widget);

  if (statsError) {
    return <Container service={service} error={statsError} />;
  }

  if (!stats || stats.error || statsError || !stats.result) {
    return (
      <Container service={service}>
        <Block label="kapowarr.volumes" />
        <Block label="kapowarr.issues" />
        <Block label="kapowarr.monitored" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="kapowarr.volumes" value={stats.result.volumes} />
      <Block label="kapowarr.issues" value={stats.result.issues} />
      <Block label="kapowarr.monitored" value={stats.result.monitored} />
    </Container>
  );
}
