describe('Hondo Ohnaka, That\'s Good Business', function () {
    integration(function (contextRef) {
        describe('Hondo Ohnaka\'s leader ability', function () {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['green-squadron-awing'],
                        leader: 'hondo-ohnaka#thats-good-business',
                    },
                    player2: {},
                });
            });

            it('should not give experience token when play a unit from hand', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.greenSquadronAwing);
                expect(context.player2).toBeActivePlayer();
            });
        });

        describe('Hondo Ohnaka\'s leader ability', function () {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        resources: ['privateer-crew', 'warbird-stowaway', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst'],
                        groundArena: ['battlefield-marine'],
                        leader: 'hondo-ohnaka#thats-good-business',
                    },
                    player2: {
                        spaceArena: ['green-squadron-awing'],
                        resources: ['freetown-backup', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst']
                    },
                });
            });

            it('should give experience token when play a unit from smuggle', function () {
                const { context } = contextRef;

                // play a unit from smuggle
                context.player1.clickCard(context.privateerCrew);

                // choose between 2 triggers
                context.player1.clickPrompt('Exhaust this leader');
                expect(context.player1).toHavePassAbilityPrompt('Exhaust this leader');
                context.player1.clickPrompt('Exhaust this leader');

                // add experience to battlefield marine
                expect(context.player1).toBeAbleToSelectExactly([context.battlefieldMarine, context.privateerCrew, context.greenSquadronAwing]);
                context.player1.clickCard(context.battlefieldMarine);
                expect(context.player2).toBeActivePlayer();
                expect(context.battlefieldMarine).toHaveExactUpgradeNames(['experience']);
            });

            it('should give experience token when play a unit from smuggle (pass on first smuggle played)', function () {
                const { context } = contextRef;

                // play a unit from smuggle
                context.player1.clickCard(context.privateerCrew);

                // choose between 2 triggers
                context.player1.clickPrompt('Exhaust this leader');
                expect(context.player1).toHavePassAbilityPrompt('Exhaust this leader');

                // do not use hondo ability yet
                context.player1.clickPrompt('Pass');
                expect(context.player2).toBeActivePlayer();

                // opponent play a unit from smuggle, nothing happen
                context.player2.clickCard(context.freetownBackup);
                expect(context.player1).toBeActivePlayer();

                // play a second unit from smuggle
                context.player1.clickCard(context.warbirdStowaway);
                expect(context.player1).toHavePassAbilityPrompt('Exhaust this leader');
                context.player1.clickPrompt('Exhaust this leader');

                // give experience token to warbird stowaway
                expect(context.player1).toBeAbleToSelectExactly([context.battlefieldMarine, context.privateerCrew, context.greenSquadronAwing, context.warbirdStowaway, context.freetownBackup]);
                context.player1.clickCard(context.warbirdStowaway);
                expect(context.warbirdStowaway).toHaveExactUpgradeNames(['experience']);
            });
        });

        describe('Hondo Ohnaka\'s leader deployed ability', function () {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['wampa'],
                        resources: ['privateer-crew', 'warbird-stowaway', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst'],
                        groundArena: ['battlefield-marine'],
                        leader: { card: 'hondo-ohnaka#thats-good-business', deployed: true },
                    },
                    player2: {
                        spaceArena: ['green-squadron-awing'],
                        resources: ['freetown-backup', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst', 'atst']
                    },
                });
            });

            it('should give experience token when play a unit from smuggle', function () {
                const { context } = contextRef;

                // play a unit from hand
                context.player1.clickCard(context.wampa);
                context.player2.passAction();

                context.player1.clickCard(context.privateerCrew);

                // choose between 2 triggers
                expect(context.player1).toHaveExactPromptButtons(['Give an experience token to a unit', 'Give 3 experience tokens to this unit']);
                context.player1.clickPrompt('Give an experience token to a unit');

                // give experience token to battlefield marine
                expect(context.player1).toBeAbleToSelectExactly([context.greenSquadronAwing, context.battlefieldMarine, context.wampa, context.privateerCrew, context.hondoOhnaka]);
                expect(context.player1).toHaveChooseNoTargetButton();
                context.player1.clickCard(context.battlefieldMarine);
                expect(context.player2).toBeActivePlayer();
                expect(context.battlefieldMarine).toHaveExactUpgradeNames(['experience']);

                // opponent play a unit from smuggle, nothing happen
                context.player2.clickCard(context.freetownBackup);
                expect(context.player1).toBeActivePlayer();

                // play a second unit from smuggle, add a experience token to warbird stowaway
                context.player1.clickCard(context.warbirdStowaway);
                expect(context.player1).toBeAbleToSelectExactly([context.battlefieldMarine, context.privateerCrew, context.greenSquadronAwing, context.warbirdStowaway, context.freetownBackup, context.wampa, context.hondoOhnaka]);
                context.player1.clickCard(context.warbirdStowaway);
                expect(context.warbirdStowaway).toHaveExactUpgradeNames(['experience']);
            });
        });
    });
});
