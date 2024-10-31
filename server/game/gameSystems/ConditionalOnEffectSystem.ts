// import type { AbilityContext } from '../core/ability/AbilityContext';
// import { MetaEventName } from '../core/Constants';
// import type { GameEvent } from '../core/event/GameEvent';
// import { GameSystem, IGameSystemProperties } from '../core/gameSystem/GameSystem';
// import { AggregateSystem } from '../core/gameSystem/AggregateSystem';
// import { CardTargetSystem } from '../core/gameSystem/CardTargetSystem';
// import { PlayerTargetSystem } from '../core/gameSystem/PlayerTargetSystem';
// import { SelectCardSystem } from './SelectCardSystem';

// interface IConditionalOnEffectSystemProperties<TContext extends AbilityContext = AbilityContext> extends IGameSystemProperties {
//     conditionedOnEffect: CardTargetSystem<TContext> | PlayerTargetSystem<TContext> | SelectCardSystem<TContext>;
//     onResolved: GameSystem<TContext>;
//     onDidNotResolve: GameSystem<TContext>;
// }

// /**
//  * Similar to {@link ConditionalSystem} except it is specifically condition on whether the selected effect resolves in a way that changes game state.
//  * Primarily used for abilities with the text "(You may) do [X]. If you do..."
//  */
// export class ConditionalOnEffectSystem<TContext extends AbilityContext = AbilityContext> extends AggregateSystem<TContext, IConditionalOnEffectSystemProperties<TContext>> {
//     protected override readonly eventName = MetaEventName.Conditional;
//     public override getInnerSystems(properties: IConditionalOnEffectSystemProperties<TContext>) {
//         return [properties.conditionedOnEffect];
//     }

//     public override getEffectMessage(context: TContext): [string, any[]] {
//         const { conditionedOnEffect: conditionedOnSystem } = this.generatePropertiesFromContext(context);
//         return conditionedOnSystem.getEffectMessage(context);
//     }

//     public override canAffect(target: any, context: TContext, additionalProperties = {}, mustChangeGameState = false): boolean {
//         const { conditionedOnEffect: conditionedOnSystem } = this.generatePropertiesFromContext(context);
//         return conditionedOnSystem.canAffect(target, context, additionalProperties, false);
//     }

//     public override hasLegalTarget(context: TContext, additionalProperties = {}): boolean {
//         const { conditionedOnEffect: conditionedOnSystem } = this.generatePropertiesFromContext(context);
//         return conditionedOnSystem.hasLegalTarget(context, additionalProperties);
//     }

//     public override queueGenerateEventGameSteps(events: GameEvent[], context: TContext, additionalProperties = {}): void {
//         const properties = this.generatePropertiesFromContext(context);
//         return conditionedOnSystem.queueGenerateEventGameSteps(events, context, additionalProperties);
//     }

//     public override queueGenerateEventGameSteps2(events: GameEvent[], context: TContext, additionalProperties = {}): void {
//         const properties = this.generatePropertiesFromContext(context, additionalProperties);
//         for (const gameSystem of properties.gameSystems) {
//             context.game.queueSimpleStep(() => {
//                 if (gameSystem.hasLegalTarget(context, additionalProperties)) {
//                     const eventsForThisAction = [];
//                     gameSystem.queueGenerateEventGameSteps(eventsForThisAction, context, additionalProperties);
//                     context.game.queueSimpleStep(() => {
//                         for (const event of eventsForThisAction) {
//                             events.push(event);
//                         }
//                         if (gameSystem !== properties.gameSystems[properties.gameSystems.length - 1]) {
//                             context.game.openEventWindow(eventsForThisAction);
//                         }
//                     }, `open event window for sequential system ${gameSystem.name}`);
//                 }
//             }, `check and add events for sequential system ${gameSystem.name}`);
//         }
//     }

//     public override hasTargetsChosenByInitiatingPlayer(context: TContext, additionalProperties = {}): boolean {
//         const { conditionedOnEffect: conditionedOnSystem } = this.generatePropertiesFromContext(context);
//         return conditionedOnSystem.hasTargetsChosenByInitiatingPlayer(
//             context,
//             additionalProperties
//         );
//     }
// }
