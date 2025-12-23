import { ExampleCard } from "@/src/domain/models/Card";
import { CardNotification } from "@/src/domain/models/CardNotification";
import { ILocalCardNotifier } from "@/src/domain/repositories/ILocalCardNotifier";
import { ExpoNotificationUtil } from "@/src/shared/utils/notification/ExpoNotificationUtil";

export class LocalCardNotifierService implements ILocalCardNotifier {
    private getExampleToShow(examples ?: Array<ExampleCard>) : string {
        let example : string = "";
        const numberExamples : number = examples ? examples.length : 0;

        if (numberExamples === 0) {
            return example;
        }

        const indexExampleToShow : number = Math.floor(Math.random() * numberExamples);
        const exampleToShow : ExampleCard | null = examples ? examples[indexExampleToShow] : null;

        if (exampleToShow) {
            example = `Ejemplo:\n ${exampleToShow.description}`;
        }

        return example;
    }

    public async notify(cardNotification: CardNotification): Promise<void> {
        const titleNotification : string =  `${cardNotification.payload.question} - ${cardNotification.payload.answer}`;
        const bodyNotification : string = this.getExampleToShow(cardNotification.payload.examples);
        await ExpoNotificationUtil.scheduleLocalNotification(
            titleNotification,
            bodyNotification,
            cardNotification.secondsFromNow
        );
    }
}