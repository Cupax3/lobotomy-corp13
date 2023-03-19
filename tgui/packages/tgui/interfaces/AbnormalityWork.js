import { useBackend } from '../backend';
import { Button, Section, Flex, Table, ProgressBar, RoundGauge, LabeledControls, ColorBox, Box, Slider, Stack } from '../components';
import { FlexItem } from '../components/Flex';
import { Window } from '../layouts';

export const scramble = (input, chance = 30) => {
  const characters = ["#", "@", "*", "&", "%", "$", "/", "<", ">", ";", "*", "*", "*", "*", "*", "*", "*"]

  var output = "";

  for (var k = 0; k < input.length; k++) {
    if (Math.random() * 100 < chance) {
      output += characters[Math.floor(Math.random() * characters.length)];
      /*
      for (var i = 0; i < Math.random() * 2; i++) {
        output += characters[Math.floor(Math.random() * characters.length)];
      }
      */
    } else {
      output += input[k];
    }
  }

  return output;
}

export const AbnormalityWork = (props, context) => {
  const { act, data } = useBackend(context);
  const {
    name,
    threat,
    threat_colour,
    understanding,
    understanding_max,
    meltdown,
    meltdown_time,
    overload_chance,
    qliphoth_meter,
    qliphoth_meter_max,
    suppression,
    works,
  } = data;

  var array = [];

  for(var work in works) {
    var l_array = [];
    l_array[0] = works[work];
    array[array.length] = l_array;
  }

  var qliphoth_low;
  var qliphoth_med;
  var e_name = name;
  var e_threat = threat;
  var e_work = "The Work"
  var e_stats = "The Stats"
  var e_instinct = "Instinct"
  var e_insight = "Insight"
  var e_attachment = "Attachment"
  var e_repression = "Repression"
  var e_instinct_chance = "Instinct Chance"
  var e_insight_chance = "Insight Chance"
  var e_attachment_chance = "Attachment Chance"
  var e_repression_chance = "Repression Chance"
  var e_meltdown = "Meltdown Timer"
  var e_understanding = "Understanding"
  var e_qliphoth = "Qliphoth Counter"
  var e_overload = "Overload Chance"

  if(suppression) {
    e_name = scramble(e_name)
    e_threat = scramble(e_threat)
    e_work = scramble(e_work)
    e_stats = scramble(e_stats)
    e_instinct = scramble(e_instinct)
    e_insight = scramble(e_insight)
    e_attachment = scramble(e_attachment)
    e_repression = scramble(e_repression)
    e_instinct_chance = scramble(e_instinct_chance)
    e_insight_chance = scramble(e_insight_chance)
    e_attachment_chance = scramble(e_attachment_chance)
    e_repression_chance = scramble(e_repression_chance)
    e_meltdown = scramble(e_meltdown)
    e_understanding = scramble(e_understanding)
    e_qliphoth = scramble(e_qliphoth)
    e_overload = scramble(e_overload)
  }

  if (qliphoth_meter_max * 0.3 > 0) {
    qliphoth_low = qliphoth_meter_max * 0.3
  } else {
    qliphoth_low = 0
  }

  if (qliphoth_meter_max * 0.6 > 0) {
    qliphoth_med = qliphoth_meter_max * 0.6
  } else {
    qliphoth_med = 0
  }

  return (
    <Window
      title="Abnormality Work Console"
      width={460}
      height={480}>
      <Window.Content>
        <Section
          textAlign="center"
          title={<Box as="span"><Box as="span" color={threat_colour}>[{e_threat}]</Box> {e_name}</Box>}
          bold>
          <Stack vertical>
            <Stack.Item>
              <Stack vertical mx={2}>
                <Section
                  textAlign="center"
                  title={e_work}
                  bold>
                  <Stack>
                    <Stack.Item>
                    </Stack.Item>
                    {works.map(work => (
                      <Stack.Item>
                        <Button
                        textAlign="center"
                        fluid
                        content={work[0]}
                        />
                      </Stack.Item>
                    ))}
                  </Stack>
                  <Table>
                    <Table.Row my={5}>
                      <Table.Cell>
                        <Button
                        textAlign="center"
                        fluid
                        color="red"
                        content={e_instinct}
                        my={0.5}
                        onClick={() => act("work", { type: "Instinct" }) } />
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                        textAlign="center"
                        fluid
                        color="yellow"
                        content={e_insight}
                        my={0.5}
                        onClick={() => act("work", { type: "Insight" }) } />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row my={5}>
                      <Table.Cell>
                        <Button
                        textAlign="center"
                        fluid color="purple"
                        content={e_attachment}
                        my={0.5}
                        onClick={() => act("work", { type: "Attachment" }) } />
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                        textAlign="center"
                        fluid
                        color="blue"
                        content={e_repression}
                        my={0.5}
                        onClick={() => act("work", { type: "repression" }) } />
                      </Table.Cell>
                    </Table.Row>
                  </Table>
                </Section>
              </Stack>
            </Stack.Item>
        <Stack.Item>
        <Flex direction="column" mx={2}>
          <Section
          textAlign="center"
          title={e_stats}
          bold>
            <Table>
              <Table.Row>
                <Table.Cell textAlign="center">
                  {e_instinct_chance}
                  <ProgressBar color="red" value={50 / 100} my={0.5} />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {e_insight_chance}
                  <ProgressBar color="yellow" value={50 / 100} my={0.5} />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="center">
                  {e_attachment_chance}
                  <ProgressBar color="purple" value={50 / 100} my={0.5} />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {e_repression_chance}
                  <ProgressBar color="blue" value={50 / 100} my={0.5} />
                </Table.Cell>
              </Table.Row>
            </Table>
            {!!meltdown && (
            <Flex justify="center" mt={2}>
              <LabeledControls>
                <LabeledControls.Item label={e_meltdown}>
                  <RoundGauge
                  value={meltdown_time}
                  size={3}/>
                </LabeledControls.Item>
              </LabeledControls>
            </Flex>
            )}
            <Flex align="stretch" justify="center" mt={2} grow={1}>
              <LabeledControls>
                <LabeledControls.Item label={e_understanding}>
                  <RoundGauge
                  value={understanding}
                  minValue={0}
                  maxValue={understanding_max}
                  size={2}
                  ranges={{
                    "bad": [0, understanding_max * 0.3],
                    "average": [understanding_max * 0.3, understanding_max * 0.6],
                    "good": [understanding_max * 0.6, understanding_max]
                  }} />
                </LabeledControls.Item>
                <LabeledControls.Item label={e_qliphoth}>
                  {!!qliphoth_meter_max && (
                    <RoundGauge
                    value={qliphoth_meter}
                    minValue={0}
                    maxValue={qliphoth_meter_max}
                    size={2}
                    ranges={{
                      "bad": [0, qliphoth_low],
                      "average": [qliphoth_low, qliphoth_med],
                      "good": [qliphoth_med, qliphoth_meter_max]
                    }} />
                  ) || (
                    <RoundGauge
                    value={qliphoth_meter}
                    minValue={0}
                    maxValue={qliphoth_meter_max}
                    size={2} />
                  )}
                </LabeledControls.Item>
                <LabeledControls.Item label={e_overload}>
                  <RoundGauge
                  value={overload_chance}
                  minValue={0}
                  maxValue={100}
                  size={2}
                  ranges={{
                    "bad": [0, 33],
                    "average": [33, 66],
                    "good": [66, 100]
                  }} />
                </LabeledControls.Item>
              </LabeledControls>
            </Flex>
          </Section>
        </Flex>
        </Stack.Item>
        </Stack>
        </Section>
      </Window.Content>
    </Window>
  )
}
