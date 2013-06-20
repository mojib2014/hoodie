describe("Events", function() {
  beforeEach(function() {
    return this.obj = new Events;
  });
  describe(".bind(event, callback)", function() {
    it("should bind the passed callback to the passed event", function() {
      var cb;
      cb = jasmine.createSpy('test');
      this.obj.bind('test', cb);
      this.obj.trigger('test');
      return expect(cb).wasCalled();
    });
    return it("should allow to pass multiple events", function() {
      var cb;
      cb = jasmine.createSpy('test');
      this.obj.bind('test1 test2', cb);
      this.obj.trigger('test1');
      this.obj.trigger('test2');
      return expect(cb.callCount).toBe(2);
    });
  });
  describe(".one(event, callback)", function() {
    return it("should bind passed callback to first occurence of passed event", function() {
      var cb;
      cb = jasmine.createSpy('test');
      this.obj.one('test', cb);
      this.obj.trigger('test');
      this.obj.trigger('test');
      return expect(cb.callCount).toBe(1);
    });
  });
  describe(".trigger(event, args...)", function() {
    it("should call subscribed callbacks", function() {
      var cb1, cb2;
      cb1 = jasmine.createSpy('test1');
      cb2 = jasmine.createSpy('test2');
      this.obj.bind('test', cb1);
      this.obj.bind('test', cb2);
      this.obj.trigger('test');
      expect(cb1).wasCalled();
      return expect(cb2).wasCalled();
    });
    return it("should pass arguments", function() {
      var cb;
      cb = jasmine.createSpy('test');
      this.obj.bind('test', cb);
      this.obj.trigger('test', 'arg1', 'arg2', 'arg3');
      return expect(cb).wasCalledWith('arg1', 'arg2', 'arg3');
    });
  });
  return describe(".unbind(event, callback)", function() {
    _when("callback passed", function() {
      return it("should unsubscribe the callback", function() {
        var cb;
        cb = jasmine.createSpy('test');
        this.obj.bind('test', cb);
        this.obj.unbind('test', cb);
        this.obj.trigger('test');
        return expect(cb).wasNotCalled();
      });
    });
    return _when("no callback passed", function() {
      return it("should unsubscribe all callbacks", function() {
        var cb1, cb2;
        cb1 = jasmine.createSpy('test1');
        cb2 = jasmine.createSpy('test2');
        this.obj.bind('test', cb1);
        this.obj.bind('test', cb2);
        this.obj.unbind('test');
        this.obj.trigger('test');
        expect(cb1).wasNotCalled();
        return expect(cb2).wasNotCalled();
      });
    });
  });
});

