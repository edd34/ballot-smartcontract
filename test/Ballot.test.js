const { assert } = require('chai');

var Ballot = artifacts.require("./Ballot.sol");

contract("Ballot - basic initialization", function (accounts) {
  const chairperson = accounts[0];
  const alice = accounts[1];
  const bob = accounts[2];
  const john = accounts[3];
  const aslan = accounts[4];
  const doe = accounts[5];

  it("add everyone to ballot as voter ", async () => {
    const ballot = await Ballot.deployed();
  });

  it("shoud give everyone right to vote ", async () => {
    await ballot.giveRightToVote(alice, { from: chairperson });
    await ballot.giveRightToVote(bob, { from: chairperson });
    await ballot.giveRightToVote(john, { from: chairperson });
    await ballot.giveRightToVote(aslan, { from: chairperson });
    await ballot.giveRightToVote(doe, { from: chairperson });
  });

  it("should test votes", async () => {
    await ballot.vote(0, { from: alice });
    await ballot.vote(1, { from: bob });
    await ballot.vote(2, { from: john });
    await ballot.vote(3, { from: aslan });
    await ballot.vote(0, { from: doe });
    await ballot.vote(0, { from: chairperson });
  });

  it("should call winning propoal", async () => {
    const winningPropCP = await ballot.winnerName({ from: chairperson });
    const winningPropAlice = await ballot.winnerName({ from: alice });
    assert.equal(winningPropCP, "A");
    assert.equal(winningPropAlice, "A");
  });

});
