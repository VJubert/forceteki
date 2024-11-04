describe('Hunter of the Haxion Brood', function () {
    integration(function (contextRef) {
        describe('Hunter of the Haxion Brood\'s ability', function () {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['hunter-of-the-haxion-brood'],
                    },
                    player2: {
                        groundArena: ['hylobon-enforcer']
                    }
                });
            });

            it('should have Shield because opponent has a unit with bounty.', function () {
                const { context } = contextRef;
                context.player1.clickCard(context.hunterOfTheHaxionBrood);
                expect(context.hunterOfTheHaxionBrood).toHaveExactUpgradeNames(['shield']);
            });
        });

        // TODO ADD TEST WITH BOUNTY UPGRADES

        describe('Hunter of the Haxon Brood\'s ability', function () {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['hunter-of-the-haxion-brood'],
                    },
                    player2: {}
                });
            });


            it('should not have Shield because opponent does not have a unit with bounty', function () {
                const { context } = contextRef;
                context.player1.clickCard(context.hunterOfTheHaxionBrood);
                expect(context.hunterOfTheHaxionBrood.isUpgraded()).toBeFalse();
            });
        });
    });
});
