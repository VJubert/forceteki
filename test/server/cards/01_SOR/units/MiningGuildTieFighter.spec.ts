describe('Mining Guild TIE Fighter', function() {
    integration(function(contextRef) {
        describe('Mining Guild TIE Fighter\'s ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        spaceArena: ['mining-guild-tie-fighter']
                    },
                    player2: {}
                });
            });

            it('should return a friendly ground unit to hand and draw', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.miningGuildTieFighter);
                expect(context.player1).toHaveExactPromptButtons(['Pay 2 resources to draw', 'Pass']);

                // pay 2 resources to draw
                context.player1.clickPrompt('Pay 2 resources to draw');
                expect(context.player1.hand.length).toBe(1);
                expect(context.player1.countExhaustedResources()).toBe(2);

                context.miningGuildTieFighter.exhausted = false;
                context.player2.passAction();

                context.player1.clickCard(context.miningGuildTieFighter);
                expect(context.player1).toHaveExactPromptButtons(['Pay 2 resources to draw', 'Pass']);
                context.player1.clickPrompt('Pass');

                // as we pass, nothing changed
                expect(context.player1.hand.length).toBe(1);
                expect(context.player1.countExhaustedResources()).toBe(2);
            });
        });
    });
});
